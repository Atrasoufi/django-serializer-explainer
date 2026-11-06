import React, { useState } from 'react';
import { Copy, Check, FileCode, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';

const SNIPPETS = {
  serializer: {
    title: 'serializers.py',
    lang: 'python',
    code: `from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    # Custom read-only computed/relationship field
    author_name = serializers.ReadOnlyField(source='author.username')
    reading_time = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 
            'title', 
            'slug', 
            'content', 
            'author_name', 
            'reading_time', 
            'created_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at']

    def get_reading_time(self, obj):
        # Calculate approximate read time in minutes
        words = len(obj.content.split())
        return max(1, round(words / 200))

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters.")
        return value`,
  },
  model: {
    title: 'models.py',
    lang: 'python',
    code: `from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Article(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title`,
  },
  views: {
    title: 'views.py',
    lang: 'python',
    code: `from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Article
from .serializers import ArticleSerializer

class ArticleDetailView(APIView):
    def get(self, request, pk):
        try:
            # 1. Fetch Python Model object from database
            article = Article.objects.get(pk=pk)
            
            # 2. Pass Python object into Serializer
            serializer = ArticleSerializer(article)
            
            # 3. Return native serialized data as JSON HTTP Response
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Article.DoesNotExist:
            return Response(
                {"error": "Article not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )`,
  },
  json: {
    title: 'response.json',
    lang: 'json',
    code: `{
  "id": 101,
  "title": "Mastering Django REST Framework Serializers",
  "slug": "mastering-django-rest-framework-serializers",
  "content": "Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes...",
  "author_name": "alex_dev",
  "reading_time": 4,
  "created_at": "2026-04-18T14:32:00Z"
}`,
  },
};

export const CodeInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof SNIPPETS>('serializer');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#080d20]/90 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-col gap-3">
      {/* Header and Snippet Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase">
              DRF Code & Architecture Inspector
            </div>
            <div className="text-[11px] text-slate-400">Production-Ready Python Code</div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs font-medium text-slate-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
        {(Object.keys(SNIPPETS) as Array<keyof typeof SNIPPETS>).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono transition-all truncate text-center ${
              activeTab === tab
                ? 'bg-purple-900/60 border border-purple-500/50 text-cyan-200 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {SNIPPETS[tab].title}
          </button>
        ))}
      </div>

      {/* Code Display Area */}
      <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-3.5 font-mono text-[11.5px] leading-relaxed text-slate-300 max-h-[280px] overflow-y-auto">
        <pre className="whitespace-pre overflow-x-auto">
          <code>{SNIPPETS[activeTab].code}</code>
        </pre>
      </div>

      {/* Concept Cheat Sheet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Serialization (Outbound)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Python Object / QuerySet ➔ Native Datatypes ➔ JSON HTTP Response
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="font-semibold text-purple-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Deserialization (Inbound)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Request JSON ➔ <code>is_valid()</code> validation ➔ <code>save()</code> to DB
          </p>
        </div>
      </div>
    </div>
  );
};
