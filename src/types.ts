export interface SceneData {
  id: number;
  name: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  tagline: string;
  narratorScript: string;
  subtitles: {
    text: string;
    start: number;
    end: number;
  }[];
}

export const SCENES: SceneData[] = [
  {
    id: 1,
    name: "The Hook",
    startTime: 0,
    endTime: 5,
    tagline: "What is a Serializer?",
    narratorScript: "When building REST APIs in Django, one question always comes up: What exactly is a Serializer?",
    subtitles: [
      { text: "When building REST APIs in Django...", start: 0.2, end: 2.2 },
      { text: "What is a Serializer?", start: 2.3, end: 4.8 }
    ]
  },
  {
    id: 2,
    name: "Django ORM & Database",
    startTime: 5,
    endTime: 15,
    tagline: "Relational DB to Python Objects",
    narratorScript: "Django models query your database and return Python model instances. But web clients don't understand Python memory objects—they need JSON.",
    subtitles: [
      { text: "Django models query your database...", start: 5.2, end: 7.8 },
      { text: "and return raw Python objects.", start: 7.9, end: 10.4 },
      { text: "Clients can't read Python memory objects!", start: 10.5, end: 14.8 }
    ]
  },
  {
    id: 3,
    name: "The Transformation",
    startTime: 15,
    endTime: 25,
    tagline: "Python Object → Serializer → JSON",
    narratorScript: "This is where the Serializer shines. It converts complex Python objects into native datatypes, ready to be rendered into clean JSON.",
    subtitles: [
      { text: "Python Object ➔ Serializer ➔ JSON", start: 15.2, end: 18.2 },
      { text: "Extracting attributes & converting types...", start: 18.3, end: 21.5 },
      { text: "Ready to transmit over standard HTTP.", start: 21.6, end: 24.8 }
    ]
  },
  {
    id: 4,
    name: "DRF Code Implementation",
    startTime: 25,
    endTime: 35,
    tagline: "ModelSerializer in Action",
    narratorScript: "Using DRF's ModelSerializer, Django automatically maps your model fields and serializes relationships in just a few lines of code.",
    subtitles: [
      { text: "DRF's ModelSerializer handles the heavy lifting.", start: 25.2, end: 28.4 },
      { text: "Auto-mapping fields & relationships...", start: 28.5, end: 31.8 },
      { text: "Writing clean, production-grade serializers.", start: 31.9, end: 34.8 }
    ]
  },
  {
    id: 5,
    name: "Client Delivery & Golden Rule",
    startTime: 35,
    endTime: 45,
    tagline: "200 OK & The Core Principle",
    narratorScript: "The client receives validated JSON data. Remember: Model stores data. Serializer transforms and validates data.",
    subtitles: [
      { text: "HTTP 200 OK: Validated JSON received!", start: 35.2, end: 38.6 },
      { text: "Model stores data.", start: 38.7, end: 41.2 },
      { text: "Serializer transforms & validates data.", start: 41.3, end: 44.8 }
    ]
  }
];

export const TOTAL_DURATION = 45; // seconds
