import { useState, useMemo } from "react";

const CONDITIONS = ["Autism","ADHD","Sensory Processing","Cerebral Palsy","Developmental Delay"];
const GOALS = ["Sensory","Fine Motor","Gross Motor","Cognitive","Social"];
const AGE_GROUPS = ["All Ages","1-3 yrs","4-6 yrs","7-10 yrs","11+ yrs"];

const ACTIVITIES = [
  // ── SENSORY ──────────────────────────────────────────────────────────
  { id:1,  title:"Finger Painting",           condition:["Autism","Sensory Processing"],                           goal:"Sensory",    age:"4-6 yrs",  level:"Easy",   materials:"Paint, paper",                  desc:"Tactile exploration through finger painting builds sensory integration and creativity.",           videoId:"MG1pqlyWA0c" },
  { id:2,  title:"Sensory Bin Play",           condition:["Autism","Sensory Processing"],                           goal:"Sensory",    age:"1-3 yrs",  level:"Easy",   materials:"Bin, rice/sand, small toys",     desc:"Calming sensory input through exploring textures in a bin of rice or sand.",                     videoId:"PusnomDcsuA" },
  { id:3,  title:"Bubble Blowing",             condition:["Autism","Sensory Processing","ADHD"],                    goal:"Sensory",    age:"1-3 yrs",  level:"Easy",   materials:"Bubble solution, wand",          desc:"Oral motor skills and visual tracking through blowing and chasing bubbles.",                     videoId:"JBNMDTAI9eo" },
  { id:4,  title:"Deep Pressure Touch",        condition:["Autism","Sensory Processing","ADHD"],                    goal:"Sensory",    age:"All Ages", level:"Easy",   materials:"Hands or weighted item",         desc:"Firm gentle pressure on the body calms the nervous system and reduces sensory overload.",         videoId:"nb1Cx-15FGo" },
  { id:5,  title:"Weighted Blanket Wrap",      condition:["Autism","Sensory Processing","ADHD"],                    goal:"Sensory",    age:"4-6 yrs",  level:"Easy",   materials:"Weighted blanket",               desc:"Deep pressure from a weighted blanket helps regulate sensory input and reduce anxiety.",           videoId:"Bn04T8SPaHE" },
  { id:6,  title:"OT Sensory Strategies",      condition:["Autism","Sensory Processing"],                           goal:"Sensory",    age:"All Ages", level:"Easy",   materials:"Various household items",        desc:"Practical home-based sensory strategies demonstrated by an occupational therapist.",              videoId:"uZpGsCKFtOI" },
  { id:7,  title:"Sensory Seekers Activities", condition:["Autism","Sensory Processing","ADHD"],                    goal:"Sensory",    age:"4-6 yrs",  level:"Medium", materials:"Trampoline, pillows, textures",  desc:"5 powerful activities for sensory-seeking children to get the input they need.",                  videoId:"s6gCc4vKKvY" },
  { id:8,  title:"Sensory Processing OT Demo", condition:["Sensory Processing"],                                   goal:"Sensory",    age:"All Ages", level:"Easy",   materials:"Various",                        desc:"Expert demonstration of how OT addresses sensory processing difficulties in children.",            videoId:"YUdsgQGHSR8" },
  { id:9,  title:"OT Activities for Autism",   condition:["Autism"],                                               goal:"Sensory",    age:"All Ages", level:"Easy",   materials:"Various home items",             desc:"A parent shares the OT activities her son does at home for sensory regulation.",                   videoId:"iIlN_kanUJA" },
  { id:10, title:"Shaving Cream Play",         condition:["Autism","Sensory Processing","Developmental Delay"],    goal:"Sensory",    age:"4-6 yrs",  level:"Easy",   materials:"Shaving cream, tray",            desc:"Writing letters and making patterns in shaving cream for tactile sensory engagement.",             videoId:"2L0Ts85WzYY" },
  { id:11, title:"Water Play",                 condition:["Autism","Sensory Processing","Developmental Delay"],    goal:"Sensory",    age:"1-3 yrs",  level:"Easy",   materials:"Water, cups, containers",        desc:"Pouring and splashing water builds tactile and proprioceptive sensory processing.",                videoId:"izEIGyBDaUA" },
  { id:12, title:"Sensory Tips for Parents",   condition:["Autism","Sensory Processing","ADHD"],                    goal:"Sensory",    age:"All Ages", level:"Easy",   materials:"None",                           desc:"9 practical OT sensory activities parents can do at home for children with autism.",               videoId:"izEIGyBDaUA" },

  // ── FINE MOTOR ───────────────────────────────────────────────────────
  { id:13, title:"Playdough Sculpting",        condition:["Autism","Cerebral Palsy","Developmental Delay"],        goal:"Fine Motor", age:"4-6 yrs",  level:"Medium", materials:"Playdough",                      desc:"Rolling and pinching playdough strengthens hand muscles and finger dexterity.",                    videoId:"m1qc6fyDfoU" },
  { id:14, title:"Scissor Skills Practice",    condition:["Autism","ADHD","Developmental Delay"],                  goal:"Fine Motor", age:"4-6 yrs",  level:"Medium", materials:"Child scissors, paper",          desc:"Step-by-step scissor skills progression for preschool and school-age children.",                  videoId:"oRlfvBaTkSg" },
  { id:15, title:"Pencil Grip Activities",     condition:["ADHD","Developmental Delay","Cerebral Palsy"],          goal:"Fine Motor", age:"4-6 yrs",  level:"Medium", materials:"Pencil, paper, cardboard",       desc:"5 activities using one cardboard piece to improve pencil grip and scissor skills.",               videoId:"HVmh3NVAw5M" },
  { id:16, title:"Bead Stringing",             condition:["Autism","Developmental Delay","Cerebral Palsy"],        goal:"Fine Motor", age:"4-6 yrs",  level:"Medium", materials:"Beads, string or pipe cleaner",  desc:"10 stringing activities to improve pincer grasp and hand-eye coordination.",                      videoId:"_ApRP7TlZn4" },
  { id:17, title:"Household Fine Motor Tasks", condition:["ADHD","Developmental Delay","Autism"],                  goal:"Fine Motor", age:"7-10 yrs", level:"Easy",   materials:"Common household items",         desc:"10 free at-home activities using everyday objects to build fine motor skills.",                   videoId:"KeMIERuxPN4" },
  { id:18, title:"Fine Motor OT Games",        condition:["Autism","ADHD","Developmental Delay"],                  goal:"Fine Motor", age:"4-6 yrs",  level:"Easy",   materials:"Various toys and games",         desc:"Paediatric OT demonstrates games children can play to develop fine motor skills.",                videoId:"syv0qIRY9yE" },
  { id:19, title:"CP Hand Activities",         condition:["Cerebral Palsy"],                                       goal:"Fine Motor", age:"4-6 yrs",  level:"Hard",   materials:"Containers, objects, toys",      desc:"Hand-based functional activities for children with cerebral palsy to build independence.",         videoId:"mr8RJrGIng0" },
  { id:20, title:"Top 5 Pencil Grasp Tips",    condition:["ADHD","Developmental Delay","Autism"],                  goal:"Fine Motor", age:"7-10 yrs", level:"Medium", materials:"Pencil, crayons",                desc:"Top 5 activities to improve pencil grasp for better handwriting in children.",                    videoId:"6kzK06I2-6Y" },
  { id:21, title:"Toddler Fine Motor OT",      condition:["Developmental Delay","Autism"],                         goal:"Fine Motor", age:"1-3 yrs",  level:"Easy",   materials:"Cups, blocks, pegs",             desc:"Pediatric OT shares fine motor activities for toddlers focusing on function.",                    videoId:"_uR0mMgYkOc" },
  { id:22, title:"Puzzles for Fine Motor",     condition:["Autism","Developmental Delay","ADHD"],                  goal:"Fine Motor", age:"4-6 yrs",  level:"Medium", materials:"Knob puzzles, jigsaw puzzles",   desc:"Unique ways to use puzzles targeting fine motor, cognitive, and creative skills.",                videoId:"FYZg5T_NeLY" },
  { id:23, title:"CP Two-Hand Reach",          condition:["Cerebral Palsy"],                                       goal:"Fine Motor", age:"4-6 yrs",  level:"Hard",   materials:"Toys at midline",                desc:"OT exercises to encourage two-hand reaching for children with spastic cerebral palsy.",            videoId:"LNGx5OxkGtA" },
  { id:24, title:"CP Home Hand Exercises",     condition:["Cerebral Palsy"],                                       goal:"Fine Motor", age:"7-10 yrs", level:"Hard",   materials:"Household items",                desc:"Home-based hand activity exercises for children with cerebral palsy.",                            videoId:"RudN6uj4wXw" },

  // ── GROSS MOTOR ───────────────────────────────────────────────────────
  { id:25, title:"Bean Bag Toss",              condition:["ADHD","Developmental Delay"],                           goal:"Gross Motor",age:"4-6 yrs",  level:"Easy",   materials:"Bean bags, basket",              desc:"Pediatric OT demonstrates bean bag coordination to build bilateral hand-eye skills.",              videoId:"sx5tnDX8ie0" },
  { id:26, title:"Obstacle Course",            condition:["ADHD","Cerebral Palsy","Developmental Delay"],          goal:"Gross Motor",age:"4-6 yrs",  level:"Hard",   materials:"Pillows, chairs, tape",          desc:"OT obstacle course for sensory integration difficulties — balance, coordination, and body awareness.",videoId:"1_HMAW1PdNE" },
  { id:27, title:"Gross Motor Toddler Play",   condition:["Developmental Delay","Autism"],                         goal:"Gross Motor",age:"1-3 yrs",  level:"Easy",   materials:"Open floor space",               desc:"Fun gross motor preschool activities for toddlers — running, jumping, and climbing.",              videoId:"8u6vMUHwe-k" },
  { id:28, title:"Balance & Movement",         condition:["ADHD","Developmental Delay","Cerebral Palsy"],          goal:"Gross Motor",age:"1-3 yrs",  level:"Easy",   materials:"None",                           desc:"Toddler movement development: balancing, jumping, running, and climbing exploration.",             videoId:"K2LFMHSUN9A" },
  { id:29, title:"Therapy Ball Activities",    condition:["Cerebral Palsy","ADHD","Sensory Processing"],           goal:"Gross Motor",age:"4-6 yrs",  level:"Medium", materials:"Exercise therapy ball",          desc:"10 safe play-based therapy ball activities from a pediatric OT for motor skills.",                 videoId:"amErM0fr7HA" },
  { id:30, title:"Preschool Obstacle Course",  condition:["Developmental Delay","ADHD","Autism"],                  goal:"Gross Motor",age:"4-6 yrs",  level:"Medium", materials:"Cones, hoops, mats",             desc:"Developmental educator demonstrates gross motor obstacle course for preschoolers.",                videoId:"9Mlk3dwO6vA" },
  { id:31, title:"CP Gross & Fine Motor",      condition:["Cerebral Palsy"],                                       goal:"Gross Motor",age:"4-6 yrs",  level:"Hard",   materials:"Mats, supports",                 desc:"Dedicated cerebral palsy gross and fine motor exercises for children.",                           videoId:"R33-qrZSHw4" },
  { id:32, title:"Special Needs Gross Motor",  condition:["Developmental Delay","Cerebral Palsy","Autism"],        goal:"Gross Motor",age:"4-6 yrs",  level:"Medium", materials:"Open space",                     desc:"Help4Special gross motor skills video covering sitting, crawling, running, and jumping.",          videoId:"BejDbpAo5Xo" },
  { id:33, title:"Paediatric Gross Motor OT",  condition:["ADHD","Developmental Delay","Cerebral Palsy"],          goal:"Gross Motor",age:"7-10 yrs", level:"Medium", materials:"Various",                        desc:"Paediatric OT demonstrates gross motor games to improve coordination and strength.",               videoId:"vvgZGh4eSg0" },
  { id:34, title:"CP OT Home Ideas",           condition:["Cerebral Palsy"],                                       goal:"Gross Motor",age:"4-6 yrs",  level:"Hard",   materials:"Household items",                desc:"OT activity ideas for quadriplegic children with CP — home-based gross motor exercises.",          videoId:"zf8d7SMuQSs" },

  // ── COGNITIVE ────────────────────────────────────────────────────────
  { id:35, title:"Sorting Colors & Shapes",    condition:["Autism","Developmental Delay"],                         goal:"Cognitive",  age:"1-3 yrs",  level:"Easy",   materials:"Colored blocks or toys",         desc:"OT sensory processing activities including sorting and categorization for cognitive development.",  videoId:"2L0Ts85WzYY" },
  { id:36, title:"ADHD Focus & Memory",        condition:["ADHD"],                                                 goal:"Cognitive",  age:"7-10 yrs", level:"Medium", materials:"Memory cards, puzzles",          desc:"Cognitive training, memory exercises, and problem-solving activities for children with ADHD.",     videoId:"LdxAMNLZpFU" },
  { id:37, title:"Brain Gym for Kids",         condition:["ADHD","Developmental Delay","Autism"],                  goal:"Cognitive",  age:"4-6 yrs",  level:"Easy",   materials:"None",                           desc:"30 brain gym activities for ages 2–10 that boost memory, focus, and coordination.",               videoId:"i6it5pqmfC8" },
  { id:38, title:"Executive Function OT Tips", condition:["ADHD","Autism"],                                        goal:"Cognitive",  age:"7-10 yrs", level:"Medium", materials:"Charts, timers, visual aids",    desc:"5 simple OT tips for executive function — focus, organisation, and emotion management.",           videoId:"SkSsGnSX1lI" },
  { id:39, title:"OT Cognitive Activities",    condition:["Autism","Developmental Delay","Cerebral Palsy"],        goal:"Cognitive",  age:"4-6 yrs",  level:"Easy",   materials:"Various home items",             desc:"Best OT cognitive activities parents can do at home — simple and informative.",                   videoId:"fozW128Cb_U" },
  { id:40, title:"ADHD OT Strategies",         condition:["ADHD"],                                                 goal:"Cognitive",  age:"7-10 yrs", level:"Medium", materials:"None",                           desc:"9 ways occupational therapy tackles ADHD symptoms including organisation and self-regulation.",    videoId:"6eMgoIYg4OQ" },
  { id:41, title:"ADHD Hyperactivity Therapy", condition:["ADHD"],                                                 goal:"Cognitive",  age:"4-6 yrs",  level:"Easy",   materials:"Art supplies, outdoor space",    desc:"8 hyperactivity therapy activities for children with ADHD including mindful colouring.",           videoId:"pWX64dldXgs" },
  { id:42, title:"Following Directions ADHD",  condition:["ADHD","Developmental Delay"],                           goal:"Cognitive",  age:"4-6 yrs",  level:"Easy",   materials:"Step cards, visual instructions", desc:"Expert tips on helping children with ADHD follow directions without constant repetition.",         videoId:"hJMf6J6HFko" },
  { id:43, title:"Play-Based OT Cognitive",    condition:["Developmental Delay"],                                  goal:"Cognitive",  age:"4-6 yrs",  level:"Easy",   materials:"Toys, games",                    desc:"Hospital play-based OT helping children with developmental delays learn through play.",            videoId:"v8OTS9YtgI0" },
  { id:44, title:"OT for Autism — Life Skills",condition:["Autism"],                                               goal:"Cognitive",  age:"7-10 yrs", level:"Medium", materials:"Daily task items",               desc:"OT helps autistic children develop life skills through varied and engaging learning activities.",   videoId:"YM5O5H3fO-E" },

  // ── SOCIAL ───────────────────────────────────────────────────────────
  { id:45, title:"Turn-Taking Games",          condition:["Autism","ADHD"],                                        goal:"Social",     age:"4-6 yrs",  level:"Medium", materials:"Board game or cards",            desc:"Top 5 OT sensory and social activities parents can do at home with their children.",               videoId:"12k0XUCKzbk" },
  { id:46, title:"Peer Play Skills Autism",    condition:["Autism"],                                               goal:"Social",     age:"4-6 yrs",  level:"Medium", materials:"Toys, games",                    desc:"How to support children with autism during peer play and social play dates.",                     videoId:"IYEGLvvY9zQ" },
  { id:47, title:"Improving Social Skills",    condition:["Autism"],                                               goal:"Social",     age:"7-10 yrs", level:"Medium", materials:"None",                           desc:"Dr. Mary Barbera discusses teaching play and social skills to children with autism.",              videoId:"BsftEby4y6k" },
  { id:48, title:"Social Games at Home",       condition:["Autism"],                                               goal:"Social",     age:"4-6 yrs",  level:"Easy",   materials:"Simple household games",         desc:"Free home therapy course — social games and theory of mind activities for autism.",               videoId:"ruQL1QwGCoc" },
  { id:49, title:"OT Play & Self-Care Skills", condition:["Autism"],                                               goal:"Social",     age:"All Ages", level:"Easy",   materials:"None",                           desc:"OTs help autistic children develop play, self-care, and social situation skills.",                 videoId:"IkVYYC3BGBE" },
  { id:50, title:"2 Social Skills for Autism", condition:["Autism"],                                               goal:"Social",     age:"4-6 yrs",  level:"Easy",   materials:"None",                           desc:"BCBA shares two fundamental social skills to teach autistic children at home.",                   videoId:"h1F4BTWsx1Y" },
  { id:51, title:"Communication Skills ABA",   condition:["Autism","Developmental Delay"],                         goal:"Social",     age:"4-6 yrs",  level:"Easy",   materials:"Circle time setup",              desc:"Circle time activity to promote communication, friendship, and social skills in autism.",          videoId:"4apZ5qf62kY" },
  { id:52, title:"Parent Guide Social Skills", condition:["Autism"],                                               goal:"Social",     age:"1-3 yrs",  level:"Easy",   materials:"None",                           desc:"Parent-led interventions to promote social and communication skills in young children with autism.",videoId:"QH0zVqyAwIg" },
  { id:53, title:"Social Skills Caregiver Tips",condition:["Autism","ADHD"],                                       goal:"Social",     age:"7-10 yrs", level:"Medium", materials:"Social story cards",             desc:"Caregiver hacks for developing social skills in children with ASD.",                              videoId:"1n3Vm-jUzrU" },
  { id:54, title:"Teaching Play Skills ABA",   condition:["Autism","Developmental Delay"],                         goal:"Social",     age:"4-6 yrs",  level:"Medium", materials:"Toys",                           desc:"How to teach play skills for children with autism using ABA techniques.",                         videoId:"x67xpqZ5bwQ" },
  { id:55, title:"ADHD Parenting & Social",    condition:["ADHD","Autism"],                                        goal:"Social",     age:"7-10 yrs", level:"Easy",   materials:"None",                           desc:"How to parent neurodiverse children with ADHD and autism — social and behavioural tips.",          videoId:"p60gpGu-3QY" },
];

const MOODS = ["😊 Great","😐 Okay","😢 Struggled"];
const MOOD_BG = {"😊 Great":"#d1fae5","😐 Okay":"#fef9c3","😢 Struggled":"#fee2e2"};
const tips = [
  "Keep therapy sessions short and fun — 10 to 15 minutes is often enough for young children.",
  "Celebrate every small win! Positive reinforcement builds confidence.",
  "Consistency matters — try to practice activities at the same time each day.",
  "Let your child lead sometimes — following their interests boosts engagement.",
  "Take breaks when your child shows signs of frustration or overwhelm.",
  "Use visual schedules to help your child know what to expect during the day.",
  "Sensory breaks before difficult tasks can improve focus and cooperation.",
];
const CONCEPTS = [
  ["Sensory Integration","Helping the brain process information from the senses effectively."],
  ["Fine Motor Skills","Small muscle movements like grasping, writing, and buttoning."],
  ["Gross Motor Skills","Larger movements like walking, jumping, and balancing."],
  ["Self-Regulation","A child's ability to manage emotions and behaviour."],
  ["Executive Function","Planning, focus, memory, and managing actions and emotions."],
  ["Proprioception","The sense of body position and movement — helps with coordination."],
];

const C = { bg:"#f5f3ff", card:"#ffffff", primary:"#7c3aed", light:"#ede9fe", accent:"#059669", warm:"#f59e0b" };

export default function App() {
  const [screen, setScreen]           = useState("home");
  const [profile, setProfile]         = useState(null);
  const [pForm, setPForm]             = useState({ name:"", age:"", condition:"", goals:[] });
  const [fCond, setFCond]             = useState("All");
  const [fGoal, setFGoal]             = useState("All");
  const [fAge,  setFAge]              = useState("All Ages");
  const [search, setSearch]           = useState("");
  const [selAct, setSelAct]           = useState(null);
  const [logs, setLogs]               = useState([]);
  const [logAct, setLogAct]           = useState(null);
  const [logForm, setLogForm]         = useState({ notes:"", mood:"" });
  const today = new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});

  const filtered = useMemo(() => ACTIVITIES.filter(a => {
    const cm = fCond === "All" || a.condition.includes(fCond);
    const gm = fGoal === "All" || a.goal === fGoal;
    const am = fAge  === "All Ages" || a.age === fAge || a.age === "All Ages";
    const sm = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    return cm && gm && am && sm;
  }), [fCond, fGoal, fAge, search]);

  const streak = (() => {
    const dates = [...new Set(logs.map(l=>l.date))].sort();
    if (!dates.length) return 0;
    let s=1,max=1;
    for(let i=1;i<dates.length;i++){
      const diff=(new Date(dates[i])-new Date(dates[i-1]))/86400000;
      if(diff===1){s++;max=Math.max(max,s);}else s=1;
    }
    return max;
  })();
  const moodCount = MOODS.reduce((a,m)=>{a[m]=logs.filter(l=>l.mood===m).length;return a},{});
  const nav = s => { setScreen(s); setSelAct(null); setLogAct(null); };

  // ── HEADER ──────────────────────────────────────────────────────────
  const Header = ({title}) => (
    <div style={{background:C.primary,color:"#fff",padding:"14px 16px",display:"flex",alignItems:"center",gap:10,borderRadius:"0 0 18px 18px",flexShrink:0}}>
      {screen!=="home" && <button onClick={()=>nav("home")} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:16}}>←</button>}
      <div style={{flex:1}}>
        <div style={{fontSize:17,fontWeight:700}}>{title}</div>
        {profile&&screen==="home"&&<div style={{fontSize:12,opacity:0.8}}>👤 {profile.name} · {today}</div>}
      </div>
      {screen!=="home"&&<div style={{fontSize:12,opacity:0.7}}>{ACTIVITIES.length} activities</div>}
    </div>
  );

  const NavBar = () => (
    <div style={{display:"flex",background:"#fff",borderTop:"1px solid #e5e7eb",flexShrink:0}}>
      {[["🏠","home","Home"],["🧩","activities","Library"],["📋","tracker","Tracker"],["📊","dashboard","Progress"],["💡","tips","Tips"]].map(([icon,s,label])=>(
        <button key={s} onClick={()=>nav(s)} style={{flex:1,padding:"10px 2px",border:"none",background:screen===s?C.light:"transparent",color:screen===s?C.primary:"#6b7280",cursor:"pointer",fontSize:10,display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontWeight:screen===s?700:400}}>
          <span style={{fontSize:18}}>{icon}</span>{label}
        </button>
      ))}
    </div>
  );

  const LevelBadge = ({level}) => {
    const cols={Easy:["#d1fae5","#059669"],Medium:["#fef9c3","#d97706"],Hard:["#fee2e2","#dc2626"]};
    return <span style={{background:cols[level][0],color:cols[level][1],borderRadius:8,padding:"3px 8px",fontSize:11,fontWeight:600}}>{level}</span>;
  };

  const VideoThumb = ({a}) => (
    <a href={`https://www.youtube.com/watch?v=${a.videoId}`} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none",marginBottom:12}}>
      <div style={{position:"relative",borderRadius:12,overflow:"hidden",background:"#000",cursor:"pointer"}}>
        <img src={`https://img.youtube.com/vi/${a.videoId}/hqdefault.jpg`} alt={a.title} style={{width:"100%",height:190,objectFit:"cover",display:"block",opacity:0.85}} />
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"rgba(220,0,0,0.92)",borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"#fff",fontSize:22,marginLeft:4}}>▶</span>
          </div>
        </div>
        <div style={{position:"absolute",bottom:8,left:10,color:"#fff",fontSize:11,fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.9)"}}>▶ Watch on YouTube</div>
      </div>
    </a>
  );

  // ── HOME ──────────────────────────────────────────────────────────
  if(screen==="home") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="🌟 OT Companion" />
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        {!profile ? (
          <div style={{background:C.card,borderRadius:16,padding:20,textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
            <div style={{fontSize:48}}>👶</div>
            <div style={{fontSize:18,fontWeight:700,color:C.primary,marginBottom:8}}>Welcome!</div>
            <div style={{color:"#6b7280",marginBottom:16,fontSize:14}}>Set up your child's profile to get personalised OT activities.</div>
            <button onClick={()=>nav("profile")} style={{background:C.primary,color:"#fff",border:"none",borderRadius:12,padding:"12px 28px",fontSize:15,fontWeight:600,cursor:"pointer"}}>Create Profile</button>
          </div>
        ):(
          <>
            <div style={{background:`linear-gradient(135deg,${C.primary},#a855f7)`,borderRadius:16,padding:18,color:"#fff",marginBottom:14}}>
              <div style={{fontSize:20,fontWeight:700}}>Hi, {profile.name}! 👋</div>
              <div style={{fontSize:13,opacity:0.85,marginTop:3}}>{profile.condition} · Age: {profile.age} yrs</div>
              <div style={{marginTop:6,fontSize:12}}>Goals: {profile.goals.length?profile.goals.join(", "):"Not set"}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[["🎯","Activities",`${ACTIVITIES.length} total`,"activities",C.primary],["📋","Today",""+logs.filter(l=>l.date===today).length+" logged","tracker",C.accent],["📊","Progress",`🔥 ${streak} day streak`,"dashboard",C.warm],["💡","Tips","For parents","tips","#6366f1"]].map(([icon,label,sub,s,c])=>(
                <div key={s} onClick={()=>nav(s)} style={{background:"#fff",borderRadius:14,padding:14,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.07)",borderLeft:`4px solid ${c}`}}>
                  <div style={{fontSize:22}}>{icon}</div>
                  <div style={{fontWeight:700,fontSize:13,color:"#1f2937",marginTop:4}}>{label}</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{fontWeight:700,color:C.primary,marginBottom:10}}>🕐 Recent Activities</div>
              {logs.length===0?<div style={{color:"#9ca3af",fontSize:13}}>No activities logged yet. Start today!</div>:
                logs.slice(-4).reverse().map((l,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<3?"1px solid #f3f4f6":"none"}}>
                    <div><div style={{fontWeight:600,fontSize:13}}>{l.activityTitle}</div><div style={{fontSize:11,color:"#9ca3af"}}>{l.date}</div></div>
                    <div style={{fontSize:20}}>{l.mood.split(" ")[0]}</div>
                  </div>
                ))
              }
            </div>
          </>
        )}
      </div>
      <NavBar/>
    </div>
  );

  // ── PROFILE ──────────────────────────────────────────────────────────
  if(screen==="profile") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="👶 Child Profile"/>
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        <div style={{background:"#fff",borderRadius:16,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          {[["Child's Name","name","text","e.g. Arjun"],["Age (years)","age","number","e.g. 5"]].map(([label,key,type,ph])=>(
            <div key={key} style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:5}}>{label}</div>
              <input type={type} placeholder={ph} value={pForm[key]} onChange={e=>setPForm(p=>({...p,[key]:e.target.value}))}
                style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #e5e7eb",fontSize:14,boxSizing:"border-box",outline:"none"}}/>
            </div>
          ))}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:7}}>Condition / Diagnosis</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {CONDITIONS.map(c=>(
                <button key={c} onClick={()=>setPForm(p=>({...p,condition:c}))} style={{padding:"7px 12px",borderRadius:20,border:`2px solid ${pForm.condition===c?C.primary:"#e5e7eb"}`,background:pForm.condition===c?C.light:"#fff",color:pForm.condition===c?C.primary:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:12}}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:7}}>Therapy Goals</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {GOALS.map(g=>{const sel=pForm.goals.includes(g);return(
                <button key={g} onClick={()=>setPForm(p=>({...p,goals:sel?p.goals.filter(x=>x!==g):[...p.goals,g]}))} style={{padding:"7px 12px",borderRadius:20,border:`2px solid ${sel?C.accent:"#e5e7eb"}`,background:sel?"#d1fae5":"#fff",color:sel?C.accent:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:12}}>{g}</button>
              );})}
            </div>
          </div>
          <button onClick={()=>{if(!pForm.name||!pForm.age||!pForm.condition)return;setProfile(pForm);setScreen("home");}} style={{width:"100%",background:C.primary,color:"#fff",border:"none",borderRadius:12,padding:13,fontSize:15,fontWeight:700,cursor:"pointer"}}>Save Profile ✓</button>
        </div>
      </div>
    </div>
  );

  // ── ACTIVITIES ──────────────────────────────────────────────────────
  if(screen==="activities") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="🧩 Activity Library"/>
      <div style={{padding:"10px 14px 0",flexShrink:0}}>
        <input placeholder="🔍 Search activities..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1.5px solid #e5e7eb",fontSize:13,boxSizing:"border-box",outline:"none",marginBottom:8}}/>
        <div style={{overflowX:"auto",display:"flex",gap:6,paddingBottom:6}}>
          {["All",...CONDITIONS].map(c=>(
            <button key={c} onClick={()=>setFCond(c)} style={{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:20,border:`2px solid ${fCond===c?C.primary:"#e5e7eb"}`,background:fCond===c?C.light:"#fff",color:fCond===c?C.primary:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:11}}>{c}</button>
          ))}
        </div>
        <div style={{overflowX:"auto",display:"flex",gap:6,paddingBottom:6}}>
          {["All",...GOALS].map(g=>(
            <button key={g} onClick={()=>setFGoal(g)} style={{whiteSpace:"nowrap",padding:"5px 11px",borderRadius:20,border:`2px solid ${fGoal===g?C.accent:"#e5e7eb"}`,background:fGoal===g?"#d1fae5":"#fff",color:fGoal===g?C.accent:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:11}}>{g}</button>
          ))}
        </div>
        <div style={{overflowX:"auto",display:"flex",gap:6,paddingBottom:6}}>
          {AGE_GROUPS.map(a=>(
            <button key={a} onClick={()=>setFAge(a)} style={{whiteSpace:"nowrap",padding:"5px 11px",borderRadius:20,border:`2px solid ${fAge===a?"#f59e0b":"#e5e7eb"}`,background:fAge===a?"#fef3c7":"#fff",color:fAge===a?"#d97706":"#6b7280",fontWeight:600,cursor:"pointer",fontSize:11}}>{a}</button>
          ))}
        </div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:6}}>{filtered.length} activit{filtered.length===1?"y":"ies"} found</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 14px 14px"}}>
        {filtered.map(a=>(
          <div key={a.id} onClick={()=>setSelAct(a)} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.07)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1,marginRight:8}}>
                <div style={{fontWeight:700,fontSize:14,color:"#1f2937"}}>{a.title}</div>
                <div style={{fontSize:11,color:"#6b7280",margin:"3px 0"}}>{a.desc}</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:7}}>
                  <span style={{background:C.light,color:C.primary,borderRadius:8,padding:"2px 7px",fontSize:10,fontWeight:600}}>{a.goal}</span>
                  <LevelBadge level={a.level}/>
                  <span style={{background:"#f0fdf4",color:"#166534",borderRadius:8,padding:"2px 7px",fontSize:10,fontWeight:600}}>👶 {a.age}</span>
                </div>
              </div>
              <span style={{fontSize:20}}>▶️</span>
            </div>
          </div>
        ))}
      </div>
      {selAct&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"flex-end",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:18,width:"100%",maxHeight:"88vh",overflowY:"auto",boxSizing:"border-box"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:17,color:"#1f2937",flex:1,marginRight:8}}>{selAct.title}</div>
              <button onClick={()=>setSelAct(null)} style={{background:"#f3f4f6",border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            <VideoThumb a={selAct}/>
            <div style={{fontSize:14,color:"#374151",marginBottom:8}}>{selAct.desc}</div>
            <div style={{fontSize:12,color:"#6b7280",marginBottom:10}}>🎒 Materials: {selAct.materials}</div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
              <span style={{background:C.light,color:C.primary,borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:600}}>{selAct.goal}</span>
              <LevelBadge level={selAct.level}/>
              <span style={{background:"#f0fdf4",color:"#166534",borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:600}}>👶 {selAct.age}</span>
            </div>
            <button onClick={()=>{setLogAct(selAct);setSelAct(null);setScreen("log");}}
              style={{width:"100%",background:C.primary,color:"#fff",border:"none",borderRadius:12,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>📋 Log This Activity</button>
          </div>
        </div>
      )}
      <NavBar/>
    </div>
  );

  // ── LOG ──────────────────────────────────────────────────────────────
  if(screen==="log") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="📝 Log Activity"/>
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        <div style={{background:"#fff",borderRadius:16,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          {logAct&&<div style={{background:C.light,borderRadius:12,padding:12,marginBottom:14,fontWeight:600,color:C.primary}}>🧩 {logAct.title}</div>}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8}}>How did it go? *</div>
            <div style={{display:"flex",gap:8}}>
              {MOODS.map(m=>(
                <button key={m} onClick={()=>setLogForm(p=>({...p,mood:m}))} style={{flex:1,padding:"11px 4px",borderRadius:12,border:`2px solid ${logForm.mood===m?C.primary:"#e5e7eb"}`,background:logForm.mood===m?MOOD_BG[m]:"#fff",cursor:"pointer",fontSize:11,fontWeight:600,color:"#374151"}}>{m}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:5}}>Notes (optional)</div>
            <textarea rows={3} placeholder="How did your child respond?" value={logForm.notes} onChange={e=>setLogForm(p=>({...p,notes:e.target.value}))}
              style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #e5e7eb",fontSize:13,boxSizing:"border-box",resize:"none",outline:"none"}}/>
          </div>
          <button onClick={()=>{if(!logAct||!logForm.mood)return;setLogs(p=>[...p,{...logForm,activityId:logAct.id,activityTitle:logAct.title,date:new Date().toLocaleDateString("en-IN")}]);setLogAct(null);setLogForm({notes:"",mood:""});nav("tracker");}}
            style={{width:"100%",background:C.accent,color:"#fff",border:"none",borderRadius:12,padding:13,fontSize:15,fontWeight:700,cursor:"pointer"}}>Save Log ✓</button>
        </div>
      </div>
    </div>
  );

  // ── TRACKER ──────────────────────────────────────────────────────────
  if(screen==="tracker") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="📋 Activity Tracker"/>
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        <button onClick={()=>nav("activities")} style={{width:"100%",background:C.primary,color:"#fff",border:"none",borderRadius:12,padding:13,fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:14}}>+ Log New Activity</button>
        {logs.length===0?(
          <div style={{textAlign:"center",color:"#9ca3af",padding:40}}>
            <div style={{fontSize:48}}>📋</div>
            <div style={{marginTop:8}}>No activities logged yet.<br/>Start from the Activity Library!</div>
          </div>
        ):[...logs].reverse().map((l,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",borderLeft:`4px solid ${MOOD_BG[l.mood]==="d1fae5"?C.accent:MOOD_BG[l.mood]==="#fef9c3"?C.warm:"#ef4444"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:700,fontSize:14}}>{l.activityTitle}</div>
              <div style={{fontSize:22}}>{l.mood.split(" ")[0]}</div>
            </div>
            <div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>{l.date}</div>
            {l.notes&&<div style={{fontSize:12,color:"#374151",marginTop:6,background:"#f9fafb",borderRadius:8,padding:"6px 10px"}}>{l.notes}</div>}
          </div>
        ))}
      </div>
      <NavBar/>
    </div>
  );

  // ── DASHBOARD ──────────────────────────────────────────────────────────
  if(screen==="dashboard") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="📊 Progress Dashboard"/>
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[["🎯","Total Logged",logs.length,C.primary],["🔥","Best Streak",`${streak} days`,C.warm],["😊","Great Sessions",moodCount["😊 Great"]||0,C.accent],["📅","Active Days",new Set(logs.map(l=>l.date)).size,"#6366f1"]].map(([icon,label,val,c])=>(
            <div key={label} style={{background:"#fff",borderRadius:14,padding:14,textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:26}}>{icon}</div>
              <div style={{fontSize:22,fontWeight:800,color:c}}>{val}</div>
              <div style={{fontSize:11,color:"#6b7280"}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:14,padding:14,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{fontWeight:700,color:"#1f2937",marginBottom:12}}>😊 Mood Breakdown</div>
          {MOODS.map(m=>{const count=moodCount[m]||0,pct=logs.length?Math.round((count/logs.length)*100):0;return(
            <div key={m} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span>{m}</span><span style={{fontWeight:600}}>{count} ({pct}%)</span></div>
              <div style={{background:"#f3f4f6",borderRadius:8,height:9,overflow:"hidden"}}>
                <div style={{width:`${pct}%`,height:"100%",background:MOOD_BG[m]==="#d1fae5"?C.accent:MOOD_BG[m]==="#fef9c3"?C.warm:"#ef4444",borderRadius:8,transition:"width 0.4s"}}/>
              </div>
            </div>
          );})}
        </div>
        <div style={{background:"#fff",borderRadius:14,padding:14,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{fontWeight:700,color:"#1f2937",marginBottom:12}}>📊 Activities by Goal</div>
          {GOALS.map(g=>{const done=logs.filter(l=>ACTIVITIES.find(a=>a.id===l.activityId)?.goal===g).length;return(
            <div key={g} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:"1px solid #f3f4f6"}}>
              <span style={{fontSize:12,flex:1,color:"#374151",fontWeight:600}}>{g}</span>
              <span style={{fontSize:14,fontWeight:700,color:C.primary}}>{done}</span>
              <span style={{fontSize:11,color:"#9ca3af"}}>sessions</span>
            </div>
          );})}
        </div>
        <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{fontWeight:700,color:"#1f2937",marginBottom:12}}>🏆 Milestones</div>
          {[["First activity logged 🎉",logs.length>=1],["5 activities completed 🌟",logs.length>=5],["10 activities completed 🏅",logs.length>=10],["25 activities completed 🥇",logs.length>=25],["3-day streak 🔥",streak>=3],["7-day streak 🌈",streak>=7],["All 5 goals explored 💜",new Set(logs.map(l=>ACTIVITIES.find(a=>a.id===l.activityId)?.goal)).size>=5]].map(([label,done])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #f3f4f6"}}>
              <span style={{fontSize:18}}>{done?"✅":"⬜"}</span>
              <span style={{fontSize:13,color:done?"#1f2937":"#9ca3af",fontWeight:done?600:400}}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <NavBar/>
    </div>
  );

  // ── TIPS ──────────────────────────────────────────────────────────────
  if(screen==="tips") return (
    <div style={{fontFamily:"sans-serif",background:C.bg,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Header title="💡 Tips for Parents"/>
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        <div style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:16,padding:18,color:"#fff",marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:34}}>🌟</div>
          <div style={{fontWeight:700,fontSize:16,marginTop:6}}>You're doing amazing!</div>
          <div style={{fontSize:12,opacity:0.85,marginTop:4}}>Every small step counts in your child's journey.</div>
        </div>
        {tips.map((tip,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{background:C.light,borderRadius:10,padding:"7px 9px",fontSize:16}}>💜</div>
            <div style={{fontSize:13,color:"#374151",lineHeight:1.6}}>{tip}</div>
          </div>
        ))}
        <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginTop:4}}>
          <div style={{fontWeight:700,color:C.primary,marginBottom:12}}>📚 Key OT Concepts</div>
          {CONCEPTS.map(([title,desc])=>(
            <div key={title} style={{marginBottom:12}}>
              <div style={{fontWeight:600,fontSize:13,color:"#1f2937"}}>{title}</div>
              <div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <NavBar/>
    </div>
  );
}
