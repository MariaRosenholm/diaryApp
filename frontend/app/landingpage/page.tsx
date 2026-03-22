//You can navigate to this page in localhost:3000/landingpage

export default function LandingPage() {
    return (
    <div>
    <h1>This is the landing page of diary app.</h1>
    <button>
      <a href="/diaryentry">New diary entry </a>
    </button>
    <button>
      <a href="/timeline"> Timeline of entries </a>
    </button>
    <button>
      <a href="../"> Click this to mock logout</a>
    </button>
  </div>
  );
  }