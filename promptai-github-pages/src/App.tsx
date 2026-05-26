import React, { useState, useEffect } from 'react';

// Gemini API Key: Vite 환경변수로 주입합니다. GitHub Pages에서는 브라우저 번들에 포함되므로 반드시 키 제한을 설정하세요.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

// 60가지 다양한 인물/피사체 프리셋
const characters = [
  "A futuristic cyberpunk hacker",
  "A wandering cosmic nomad",
  "An ancient celestial wizard",
  "A steampunk airship captain",
  "A majestic fantasy elven queen",
  "A futuristic neon-glowing android",
  "A weary post-apocalyptic survivor",
  "A cute magical girl with a glowing staff",
  "A mysterious noir detective in a trench coat",
  "A legendary samurai under falling cherry blossoms",
  "An astronaut floating in deep space",
  "A deep-sea diver discovering an underwater city",
  "A vintage jazz saxophonist",
  "A high-tech mech pilot in a cockpit",
  "A medieval knight in ornate silver armor",
  "A cyberpunk street racer next to a sleek bike",
  "A forest druid surrounded by glowing flora",
  "A Victorian vampire noble",
  "A futuristic neon-masked DJ",
  "A mythical phoenix in human form",
  "A nomadic desert merchant with a futuristic caravan",
  "A cyborg assassin on a skyscraper roof",
  "A cheerful retro-futuristic robot chef",
  "A ghostly Victorian lady holding a lantern",
  "A Norse warrior standing in a snowstorm",
  "A solar-punk gardener tending rooftop plants",
  "A mystical kitsune (nine-tailed fox) spirit",
  "A futuristic bio-luminescent scientist",
  "A space explorer standing on a red planet",
  "A time-traveling historian with a retro pocket watch",
  "A rebellious neon graffiti artist",
  "An ancient Greek goddess of light",
  "A modern urban spellcaster using phone magic",
  "A quiet librarian in a floating library",
  "A steampunk clockwork ballerina",
  "A shadow ninja holding a glowing energy kunai",
  "A rugged mountain explorer reaching the peak",
  "A cosmic deity weaving galaxies",
  "A cyber-enhanced street monk meditating",
  "A whimsical toy maker in a magical workshop",
  "A futuristic underwater mermaid with bio-tech scales",
  "A legendary dragon-rider overlooking a valley",
  "A retro vintage pilot from the 1920s",
  "A post-apocalyptic scrap mechanic",
  "A glowing celestial angel with crystal wings",
  "A cyberpunk courier running across rooftops",
  "An alchemy scholar mixing glowing potions",
  "A futuristic space marine in heavy exo-armor",
  "A neon-lit geisha in a high-tech tea house",
  "A wandering ronin with a plasma katana",
  "A modern barista brewing sparkling starlight coffee",
  "A cute fluffy space hamster in a tiny spacesuit",
  "A Victorian plague doctor with glowing emerald eyes",
  "A solarpunk architect drawing holographic designs",
  "A crystal golem guarding a subterranean oasis",
  "A cybernetic mercenary drinking at a neon bar",
  "A whimsical cloud-weaver sitting on a crescent moon",
  "A dapper 1920s detective analyzing a glowing clue",
  "A majestic ice queen sculpting a frozen palace",
  "A futuristic virtual reality idol performing on stage"
];

// 60가지 시네마틱 상황/배경 프리셋
const situations = [
  "sitting in a cozy retro cafe during a rainy afternoon.",
  "standing on a futuristic rooftop overlooking a neon metropolis at midnight.",
  "discovering a hidden glowing cave filled with crystal formations.",
  "navigating a bustling night market filled with colorful holographic lanterns.",
  "meditating beneath a massive glowing tree of life in a magical forest.",
  "walking through ancient ruins as golden hour sunlight filters through.",
  "repairing a colossal broken robot in a steampunk hangar.",
  "gazing at a massive swirling galaxy from a glass observatory.",
  "performing an energetic concert in a crowded stadium filled with laser lights.",
  "drinking tea in a traditional tatami room while a soft snow falls outside.",
  "walking down a wet, reflection-heavy alleyway in cyberpunk Neo-Seoul.",
  "floating weightlessly inside a beautiful botanical space station.",
  "examining an ancient, glowing spellbook in a dusty wizard tower.",
  "riding a futuristic hoverbike through a dusty desert canyon at sunset.",
  "gazing out of a train window as it travels through a beautiful fantasy sky.",
  "fighting a shadow monster with a sword of pure starlight.",
  "sitting on a pier, dipping feet into bio-luminescent ocean waves.",
  "painting a massive holographic canvas in a sleek high-tech art studio.",
  "wandering through a beautiful lavender field under a double moon.",
  "hiding from a searchlight behind a concrete wall in a dystopian city.",
  "playing a grand piano on a stage made of solid water.",
  "shopping for weird ingredients in a magical goblin bazaar.",
  "sleeping peacefully inside a giant floating bubble.",
  "exploring a colossal sunken shipwreck overgrown with glowing coral reefs.",
  "enjoying a colorful picnic on a floating island high above the clouds.",
  "looking at the horizon from the edge of a colossal waterfall.",
  "escaping a burning steampunk laboratory with a golden artifact.",
  "reading a book by the fireplace inside a cozy mountain log cabin.",
  "dancing with a shadow figure under a bright full moon.",
  "operating a massive holographic command center in a starship.",
  "waiting for a bus at a quiet, rural bus stop surrounded by glowing fireflies.",
  "casting a spell that creates a miniature solar system around them.",
  "running through a golden wheat field as a futuristic airship flies overhead.",
  "enjoying a hot bowl of ramen at a neon-lit street food stall.",
  "painting neon graffiti on a concrete wall under a dark highway overpass.",
  "searching for star fragments in a grassy field during a meteor shower.",
  "holding a tiny glowing baby dragon in the palm of their hand.",
  "riding a giant mechanical whale through a sea of clouds.",
  "standing in the middle of a massive clockwork tower with spinning gears.",
  "observing a beautiful aurora borealis from a snowy arctic campsite.",
  "crafting a glowing sword inside a volcanic forge.",
  "exploring a giant, futuristic library with floating books and shelves.",
  "having a conversation with a holographic projection of an ancestor.",
  "walking through an autumn park with golden leaves gently falling.",
  "standing on the wing of a flying retro biplane above a city.",
  "sipping a glowing cocktail at a high-tech lounge bar.",
  "planting a glowing blue seed in a barren, post-apocalyptic wasteland.",
  "meditating on a high mountain peak overlooking a sea of mist.",
  "dodging lasers during a high-stakes heist inside a museum.",
  "floating in a warm hot spring surrounded by cherry blossom trees.",
  "looking at a mysterious ancient map that lights up with glowing runes.",
  "sliding down a massive rainbow-colored highway in virtual reality.",
  "standing inside a glass dome under a stormy alien sky.",
  "playing with glowing jellyfish in a deep-sea cavern.",
  "sitting on a throne made of emerald crystals in a dark cavern.",
  "eating colorful street food in a bustling retro-futuristic Chinatown.",
  "examining a glowing pocket watch that seems to bend time around it.",
  "watering giant mushrooms in a colorful underground fantasy farm.",
  "crossing a rope bridge over a deep misty jungle canyon.",
  "looking up at a majestic constellation of a wolf in the sky."
];

// 촬영 기기 카테고리 및 세부 스펙 정의
const cameraCategories = [
  {
    category: "현대 전문 미러리스 / DSLR (Modern Professional)",
    options: [
      { id: "Sony A7R V", name: "Sony Alpha 7R V (초고해상도 풀프레임)", spec: "Sony Alpha 7R V camera, ultra-high resolution, tack-sharp modern details, rich textures" },
      { id: "Canon EOS R5", name: "Canon EOS R5 (화사한 인물 색채)", spec: "Canon EOS R5 camera, vibrant skin tones, cinematic lifelike color rendering, commercial beauty photography style" },
      { id: "Nikon Z9", name: "Nikon Z9 (스피디하고 선명한 디테일)", spec: "Nikon Z9 camera, crystal clear dynamic range, natural realism, sharp contrast" },
      { id: "Fujifilm GFX 100S", name: "Fujifilm GFX 100S (중형 포맷의 공간감)", spec: "Fujifilm GFX 100S medium format camera, stunning depth of field, rich tonality, high artistic quality" },
      { id: "Hasselblad H6D", name: "Hasselblad H6D-100c (상업 스튜디오의 최정점)", spec: "Hasselblad H6D-100c medium format camera, legendary Swedish color science, perfect crisp sharpness" },
      { id: "Leica Q3", name: "Leica Q3 (감성 스냅과 마이크로 콘트라스트)", spec: "Leica Q3 camera, Summilux lens rendering, rich black values, elegant German color signature" }
    ]
  },
  {
    category: "클래식 필름 & 빈티지 (Classic Film & Vintage)",
    options: [
      { id: "Leica M6 35mm", name: "Leica M6 (빈티지 35mm 아날로그 필름)", spec: "Leica M6 rangefinder, 35mm analog film look, organic nostalgic grain, warm muted color palette" },
      { id: "Hasselblad 500C", name: "Hasselblad 500C (정사각형 중형 필름)", spec: "Hasselblad 500C square medium format film, soft natural roll-off, 120mm retro photographic charm" },
      { id: "Polaroid SX-70", name: "Polaroid SX-70 (아날로그 즉석 사진)", spec: "Polaroid SX-70 instant camera effect, faded pastel colors, soft glow, slightly out of focus, nostalgic Y2K snap" },
      { id: "Disposable Camera", name: "Disposable Toy Camera (일회용 폰카/디카)", spec: "Kodak FunSaver disposable camera style, cheap plastic lens flare, harsh direct flash, flat amateur retro snapshots" },
      { id: "Super 8mm", name: "Super 8mm (클래식 8밀리 영화 감성)", spec: "Super 8mm vintage cinematic camera, warm sepia undertones, flickering frames, subtle dust scratches and light leaks" },
      { id: "Lomo LC-A", name: "Lomography LC-A (비비드 색감과 비네팅)", spec: "Lomography LC-A, highly saturated toy camera colors, dark moody vignette borders, unpredictable light leaks" },
      { id: "Daguerreotype", name: "Daguerreotype (19세기 다게레오 은판화)", spec: "19th century daguerreotype plate camera rendering, monochrome sepia texture, historic antique silver plate scratches, raw historical decay" }
    ]
  },
  {
    category: "최신 스마트폰 (Modern Smartphones)",
    options: [
      { id: "iPhone 15 Pro", name: "Apple iPhone 15 Pro Max (컴퓨테이셔널 스마트 HDR)", spec: "Apple iPhone 15 Pro Max camera shot, smart HDR tone-mapping, mobile lens sharpness, crisp modern phone photograph style" },
      { id: "Galaxy S24 Ultra", name: "Samsung Galaxy S24 Ultra (초망원 인공지능 보정)", spec: "Samsung Galaxy S24 Ultra camera, vivid color saturation, sharp digital detailing, modern ultra-wide mobile look" },
      { id: "Google Pixel 8", name: "Google Pixel 8 Pro (감성적 톤 매핑)", spec: "Google Pixel 8 Pro camera, deep dramatic shadows, artistic computational night photography, balanced exposure" }
    ]
  },
  {
    category: "세기말 레트로 모바일 핸드폰 (Y2K / Retro Mobile)",
    options: [
      { id: "Motorola Razr V3", name: "Motorola Razr V3 (2004 폴더폰 저화질)", spec: "Year 2004 Motorola Razr V3 flip phone camera, pixelated 0.3MP VGA quality, extreme compression noise, low-fidelity mobile sensor" },
      { id: "Nokia 3310 Retro", name: "Nokia Feature Phone (레트로 매트릭스 폰카)", spec: "Nostalgic early Nokia feature phone display capture, heavily dithered low-res colors, retro liquid crystal screen artifacts" },
      { id: "Sony Ericsson K750", name: "Sony Ericsson K750i (Y2K 중반 디카폰)", spec: "Sony Ericsson K750i Cybershot phone camera, early digital sensor noise, classic soft CCD sensor glow, raw direct telephone flash" }
    ]
  }
];

export default function App() {
  // 좌측 입력 패널 모드 상태 관리
  const [inputMode, setInputMode] = useState('text');
  const [userPrompt, setUserPrompt] = useState('');
  
  // 이미지 에디트 모드용 이미지 상태 관리
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState('');
  const [uploadedImageMimeType, setUploadedImageMimeType] = useState('');

  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  const [selectedCamera, setSelectedCamera] = useState('Sony A7R V');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [targetPlatform, setTargetPlatform] = useState('Midjourney'); // 'Midjourney', 'Stable Diffusion', 'Normal'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'compiled', 'json'
  const [toastMessage, setToastMessage] = useState('');
  
  // 새로운 배경 태그 직접 입력을 위한 입력 임시 상태
  const [newBgElement, setNewBgElement] = useState('');

  // 캐러셀 카드 단계를 관리하는 상태 (0 ~ 4)
  const [activeStep, setActiveStep] = useState(0);

  // 우측 영역 대화형 자이로스코프 패럴랙스 스타일 상태
  const [rightCardStyle, setRightCardStyle] = useState({});

  // 기본 스키마 데이터 정의
  const initialJson = {
    "subject_details": {
      "main_subject": {
        "identity": "A majestic mechanical guardian owl",
        "pose": "perched on an ancient moss-covered marble pillar",
        "expression": "sharp and vigilant, brass eyes glowing with wisdom",
        "micro_details": "etched golden runes on feathers, complex brass joints, steam rising slightly"
      },
      "attire_and_style": {
        "clothing": "ornate obsidian armor chestplate",
        "materials": "brushed copper, weathered granite, glowing turquoise core",
        "accessories": "a small clockwork telescope attached to its right eye"
      }
    },
    "environment_and_background": {
      "location": "A forgotten ancient library overgrown with giant ferns",
      "background_elements": ["cascading dust motes", "broken stone archways", "shelves with decaying books", "sunbeams cutting through the mist"],
      "depth_layers": {
        "foreground": "vibrant green hanging ivy dripping with dew",
        "midground": "the guardian owl sitting proudly on its pillar base",
        "background": "endless towering bookshelves fading into dark shadows"
      }
    },
    "composition_and_camera": {
      "shot_type": "Cinematic Medium Portrait",
      "camera_angle": "Low-angle heroic view",
      "lens_spec": "Sony Alpha 7R V camera, ultra-high resolution, tack-sharp modern details, rich textures",
      "framing_rule": "Symmetrical centerpiece with organic golden spiral flow"
    },
    "lighting_and_atmosphere": {
      "primary_light": "Divine golden morning light from high cathedral windows",
      "secondary_light": "Turquoise luminescent bioluminescent glow from moss below",
      "rim_light": "Soft halo rim light accentuating the mechanical feathers",
      "mood": "Mystical, grand, quiet, lost in eternal time",
      "color_palette": {
        "primary_hex": "#ffb938",
        "secondary_hex": "#14b8a6",
        "accent_hex": "#f59e0b",
        "background_hex": "#061b18"
      }
    },
    "rendering_and_quality": {
      "art_style": "High-fidelity photorealistic concept art",
      "texture_quality": "Microscopic detail, sharp focus on mechanical engraving, 8k resolution",
      "engine_modifiers": "Unreal Engine 5 path-tracer, global illumination, atmospheric fog depth",
      "negative_prompt": "blurry, generic, 3d render look, plastic, low contrast, human hands, deformed wings"
    }
  };

  const [promptData, setPromptData] = useState(initialJson);

  // 화풍 프리셋 가이드
  const stylePresets = {
    'Cinematic': 'High-end cinema look, cinematic lighting, dramatic mood, photorealistic textures, anamorphic lens specs.',
    'Anime / Webtoon': 'Vibrant anime style, clean cell shading, stylized linework, expressive hand-drawn aesthetics, magical lighting.',
    '3D Render / Game': 'Unreal Engine 5 style, octane render, stylized 3D game character, soft clay shaders or advanced materials.',
    'Fantasy Painting': 'Oil on canvas texture, rich brushstrokes, ethereal fantasy lighting, mythical colors, classical composition.',
    'Pixel Art': 'Retro 16-bit or 32-bit pixel art, limited color palette, clean grid alignment, nostalgic game aesthetic.'
  };

  // 마우스 자이로 플로팅 계산 엔진 (우측 카드 전용)
  const handleCardTilt = (e, setStyle, isRight = false) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // 최대 7.5도 기울기 제어
    const rotateY = ((x - xc) / xc) * 7.5;
    const rotateX = -((y - yc) / yc) * 7.5;
    
    const shadowColor = isRight ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.12)';
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`,
      boxShadow: `${-(x - xc) * 0.15}px ${(yc - y) * 0.15 + 28}px 48px -10px ${shadowColor}`,
      zIndex: 20
    });
  };

  // 마우스 복원 복구 엔진
  const resetCardTilt = (setStyle) => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
      transition: 'transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)'
    });
  };

  // 피드백 토스트 알림 표시 함수
  function showToast(message) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  }

  // 60x60 랜덤 시나리오 생성 핸들러
  function handleRandomize() {
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    const randomSit = situations[Math.floor(Math.random() * situations.length)];
    const combinedPrompt = `${randomChar} ${randomSit}`;
    setUserPrompt(combinedPrompt);
    showToast("새로운 인물 × 상황 아이디어가 조합되었습니다!");
  }

  // 현재 선택된 카메라의 상세 스펙 스크립트 도출 함수
  function getCameraSpec() {
    for (const cat of cameraCategories) {
      const found = cat.options.find(opt => opt.id === selectedCamera);
      if (found) return found.spec;
    }
    return "High quality camera spec";
  }

  // 중첩 구조의 상태를 업데이트하기 위한 전용 헬퍼 함수들
  function updateNestedField(section, subsection, value) {
    setPromptData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: value
      }
    }));
  }

  // 이중 중첩 필드 업데이트
  function updateSubNestedField(section, subsection, field, value) {
    setPromptData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  }

  function handleArrayFieldChange(section, field, index, value) {
    setPromptData(prev => {
      const updatedArray = [...prev[section][field]];
      updatedArray[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedArray
        }
      };
    });
  }

  // 배열 항목 추가
  function addArrayItem(section, field, valueToAdd) {
    const trimmed = valueToAdd.trim();
    if (!trimmed) return;
    setPromptData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field] || []), trimmed]
      }
    }));
  }

  // 배열 항목 삭제
  function removeArrayItem(section, field, index) {
    setPromptData(prev => {
      const updatedArray = prev[section][field].filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedArray
        }
      };
    });
  }

  function sanitizeHexForPicker(hex) {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      return hex;
    }
    return "#000000";
  }

  // 로컬 파일 업로드 핸들러
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedImageMimeType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      const base64Data = reader.result.split(',')[1];
      setUploadedImageBase64(base64Data);
      showToast("원본 이미지 분석 준비 완료");
    };
    reader.readAsDataURL(file);
  }

  // 업로드 이미지 초기화
  function handleRemoveImage() {
    setUploadedImage(null);
    setUploadedImageBase64('');
    setUploadedImageMimeType('');
    showToast("업로드 이미지 초기화 완료");
  }

  // 수동 JSON 파일 다운로드 기능
  function downloadJsonFile() {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(promptData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "promptai_schema.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("JSON 파일 다운로드가 완료되었습니다!");
    } catch (err) {
      console.error(err);
      showToast("파일 내보내기 실패");
    }
  }

  // AI로부터 수집된 세그먼트를 텍스트 프롬프트 문자열로 동적 정렬 및 정제
  function compilePromptString() {
    const sub = promptData.subject_details;
    const env = promptData.environment_and_background;
    const cam = promptData.composition_and_camera;
    const light = promptData.lighting_and_atmosphere;
    const rend = promptData.rendering_and_quality;

    if (!sub || !env || !cam || !light || !rend) return "프롬프트 데이터를 구성 중입니다...";

    // 1. 핵심 주제부
    let subjectPart = `${sub.main_subject?.identity || ''}`;
    if (sub.main_subject?.pose) subjectPart += `, ${sub.main_subject.pose}`;
    if (sub.main_subject?.expression) subjectPart += `, with expression of ${sub.main_subject.expression}`;
    if (sub.main_subject?.micro_details) subjectPart += ` (${sub.main_subject.micro_details})`;

    // 2. 의상 및 장신구
    let attirePart = "";
    if (sub.attire_and_style?.clothing) attirePart += `wearing ${sub.attire_and_style.clothing}`;
    if (sub.attire_and_style?.materials) attirePart += ` made of ${sub.attire_and_style.materials}`;
    if (sub.attire_and_style?.accessories) attirePart += `, accessorized with ${sub.attire_and_style.accessories}`;

    // 3. 환경 및 위치
    let envPart = "";
    if (env.location) envPart += `at ${env.location}`;
    if (env.background_elements && env.background_elements.length > 0) {
      envPart += `, with ${env.background_elements.join(', ')}`;
    }
    
    // 4. 레이어 구성
    let depthPart = "";
    if (env.depth_layers?.foreground || env.depth_layers?.midground || env.depth_layers?.background) {
      depthPart += `[Layers: Foreground is ${env.depth_layers.foreground || 'none'}, Midground is ${env.depth_layers.midground || 'none'}, Background is ${env.depth_layers.background || 'none'}]`;
    }

    // 5. 구도 & 카메라
    let cameraPart = "";
    if (cam.shot_type) cameraPart += `${cam.shot_type}`;
    if (cam.camera_angle) cameraPart += `, ${cam.camera_angle}`;
    if (cam.lens_spec) cameraPart += `, shot on ${cam.lens_spec}`;
    if (cam.framing_rule) cameraPart += `, ${cam.framing_rule}`;

    // 6. 조명 및 분위기
    let lightingPart = "";
    if (light.primary_light) lightingPart += `illuminated by ${light.primary_light}`;
    if (light.secondary_light) lightingPart += ` with ${light.secondary_light}`;
    if (light.rim_light) lightingPart += ` and ${light.rim_light}`;
    if (light.mood) lightingPart += `, evoking a ${light.mood} mood`;

    // 7. 렌더링 스타일 및 퀄리티 사양
    let renderingPart = "";
    if (rend.art_style) renderingPart += `${rend.art_style}`;
    if (rend.texture_quality) renderingPart += `, ${rend.texture_quality}`;
    if (rend.engine_modifiers) renderingPart += `, ${rend.engine_modifiers}`;

    // 컬러 매칭 안내
    let colorPalettePart = "";
    if (light.color_palette) {
      const p = light.color_palette;
      colorPalettePart += `color palette tags: ${p.primary_hex || ''}, ${p.secondary_hex || ''}, ${p.accent_hex || ''}, ${p.background_hex || ''}`;
    }

    // 플랫폼 특수 규칙 매핑 및 마무리 조립
    let compiled = `${rend.art_style ? rend.art_style + ' of ' : ''}${subjectPart}. ${attirePart}. ${envPart}. ${depthPart}. ${cameraPart}. ${lightingPart}. ${colorPalettePart}. ${renderingPart}.`;
    
    // 이중 공백 정제
    compiled = compiled.replace(/\s+/g, ' ').replace(/,\s*,/g, ',').trim();

    if (targetPlatform === 'Midjourney') {
      // Midjourney v8 버전 규격 적용 및 정밀 제어
      const arParam = aspectRatio ? ` --ar ${aspectRatio}` : " --ar 16:9";
      const styleParam = selectedStyle === 'Cinematic' ? ' --style raw' : '';
      return `${compiled}${arParam}${styleParam} --v 8.0`;
    } else if (targetPlatform === 'Stable Diffusion') {
      // Stable Diffusion
      return `${compiled}, extremely detailed, masterwork, highly intricate. Negative prompt: ${rend.negative_prompt || 'low quality, blurry'}`;
    } else {
      // Normal: 아무런 플랫폼 매개변수가 붙지 않는 순수 설명 프롬프트 렌더링
      return compiled;
    }
  }

  // Gemini API 호출을 통한 프롬프트 디코딩 및 확장 기능
  async function generatePrompt() {
    if (!userPrompt.trim()) {
      showToast("요청 사항을 입력해 주세요.");
      return;
    }
    if (inputMode === 'edit' && !uploadedImageBase64) {
      showToast("수정할 원본 이미지를 업로드해 주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    let apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    let payload = {};

    if (inputMode === 'text') {
      const systemPrompt = `You are an elite AI Image Prompt Engineer. 
Your objective is to take any concept described by the user (which can be in Korean, English, or any other language) and translate/expand it into a highly detailed, extremely vivid IMAGE PROMPT strictly in the specified JSON format.

RULES:
1. All generated text values inside the JSON MUST be written in high-quality, professional English.
2. Carefully adapt the description based on the style concept: "${stylePresets[selectedStyle]}".
3. Provide rich artistic vocabulary, realistic cameras, appropriate color palettes (use real HEX codes), lighting setups, and tailored rendering engine properties.
4. Ensure the JSON conforms EXACTLY to the structure requested. Only return pure JSON.

JSON Structure:
{
  "subject_details": {
    "main_subject": { "identity": "", "pose": "", "expression": "", "micro_details": "" },
    "attire_and_style": { "clothing": "", "materials": "", "accessories": "" }
  },
  "environment_and_background": {
    "location": "",
    "background_elements": ["", ""],
    "depth_layers": { "foreground": "", "midground": "", "background": "" }
  },
  "composition_and_camera": { "shot_type": "", "camera_angle": "", "lens_spec": "", "framing_rule": "" },
  "lighting_and_atmosphere": { "primary_light": "", "secondary_light": "", "rim_light": "", "mood": "", "color_palette": { "primary_hex": "#", "secondary_hex": "#", "accent_hex": "#", "background_hex": "#" } },
  "rendering_and_quality": { "art_style": "", "texture_quality": "", "engine_modifiers": "", "negative_prompt": "" }
}`;

      const userQuery = `사용자 요청 컨셉: "${userPrompt}"\n타겟 아트 스타일: "${selectedStyle}"\n지정된 촬영 기기/카메라 종류 및 감성: "${getCameraSpec()}"\n제시된 촬영 기기의 렌즈 규격, 센서 노이즈 특징, 색감 시그니처 및 질감을 "composition_and_camera"의 "lens_spec" 필드와 "rendering_and_quality"의 "art_style" 필드 등에 완벽히 동기화하여 영문 JSON 스키마를 채워줘.`;

      payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              subject_details: {
                type: "OBJECT",
                properties: {
                  main_subject: {
                    type: "OBJECT",
                    properties: {
                      identity: { type: "STRING" },
                      pose: { type: "STRING" },
                      expression: { type: "STRING" },
                      micro_details: { type: "STRING" }
                    },
                    required: ["identity", "pose", "expression", "micro_details"]
                  },
                  attire_and_style: {
                    type: "OBJECT",
                    properties: {
                      clothing: { type: "STRING" },
                      materials: { type: "STRING" },
                      accessories: { type: "STRING" }
                    },
                    required: ["clothing", "materials", "accessories"]
                  }
                },
                required: ["main_subject", "attire_and_style"]
              },
              environment_and_background: {
                type: "OBJECT",
                properties: {
                  location: { type: "STRING" },
                  background_elements: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                  },
                  depth_layers: {
                    type: "OBJECT",
                    properties: {
                      foreground: { type: "STRING" },
                      midground: { type: "STRING" },
                      background: { type: "STRING" }
                    },
                    required: ["foreground", "midground", "background"]
                  }
                },
                required: ["location", "background_elements", "depth_layers"]
              },
              composition_and_camera: {
                type: "OBJECT",
                properties: {
                  shot_type: { type: "STRING" },
                  camera_angle: { type: "STRING" },
                  lens_spec: { type: "STRING" },
                  framing_rule: { type: "STRING" }
                },
                required: ["shot_type", "camera_angle", "lens_spec", "framing_rule"]
              },
              lighting_and_atmosphere: {
                type: "OBJECT",
                properties: {
                  primary_light: { type: "STRING" },
                  secondary_light: { type: "STRING" },
                  rim_light: { type: "STRING" },
                  mood: { type: "STRING" },
                  color_palette: {
                    type: "OBJECT",
                    properties: {
                      primary_hex: { type: "STRING" },
                      secondary_hex: { type: "STRING" },
                      accent_hex: { type: "STRING" },
                      background_hex: { type: "STRING" }
                    },
                    required: ["primary_hex", "secondary_hex", "accent_hex", "background_hex"]
                  }
                },
                required: ["primary_light", "secondary_light", "rim_light", "mood", "color_palette"]
              },
              rendering_and_quality: {
                type: "OBJECT",
                properties: {
                  art_style: { type: "STRING" },
                  texture_quality: { type: "STRING" },
                  engine_modifiers: { type: "STRING" },
                  negative_prompt: { type: "STRING" }
                },
                required: ["art_style", "texture_quality", "engine_modifiers", "negative_prompt"]
              }
            },
            required: [
              "subject_details",
              "environment_and_background",
              "composition_and_camera",
              "lighting_and_atmosphere",
              "rendering_and_quality"
            ]
          }
        }
      };

    } else {
      // Image Edit 모드 - 멀티모달 프롬프트 디렉션 설정
      const imageSystemInstruction = `You are an elite Image Editing Prompt Engineer. 
Analyze the provided original image and the user's specific edit request. Your goal is to generate a structured image prompt JSON that represents the MODIFIED version of this image.

RULES:
1. Carefully analyze what exists in the original image (subject, pose, style, environment, lighting).
2. Apply the user's editing request. Keep the unmodified details consistent with the original image to preserve identity, but describe the requested changes in high detail.
3. If the user wants to add accessories, update "subject_details.attire_and_style.accessories". If they want to change the weather/season, update "environment_and_background".
4. Describe all modified and unmodified values inside the JSON strictly in professional English.
5. Do not include markdown formatting or conversational filler; output only pure JSON conforming to the schema.

JSON Schema structure:
{
  "subject_details": {
    "main_subject": { "identity": "Subject desc", "pose": "pose desc", "expression": "expression desc", "micro_details": "micro desc" },
    "attire_and_style": { "clothing": "clothing desc", "materials": "materials desc", "accessories": "accessories desc" }
  },
  "environment_and_background": {
    "location": "location desc",
    "background_elements": ["element1", "element2"],
    "depth_layers": { "foreground": "foreground desc", "midground": "midground desc", "background": "background desc" }
  },
  "composition_and_camera": { "shot_type": "shot type desc", "camera_angle": "angle desc", "lens_spec": "lens desc", "framing_rule": "framing rule desc" },
  "lighting_and_atmosphere": { "primary_light": "primary light", "secondary_light": "secondary light", "rim_light": "rim light", "mood": "mood desc", "color_palette": { "primary_hex": "#", "secondary_hex": "#", "accent_hex": "#", "background_hex": "#" } },
  "rendering_and_quality": { "art_style": "art style desc", "texture_quality": "texture qual", "engine_modifiers": "engine mods", "negative_prompt": "negative keywords" }
}`;

      const editPrompt = `Analyze the attached image and the edit request.
Edit Request: "${userPrompt}"
Target Camera Vibe: "${getCameraSpec()}"
Target Art Style Mode: "${stylePresets[selectedStyle]}"

Generate the final structured JSON prompt that modifies the image exactly as requested.`;

      payload = {
        contents: [{
          role: "user",
          parts: [
            { text: editPrompt },
            {
              inlineData: {
                mimeType: uploadedImageMimeType || "image/png",
                data: uploadedImageBase64
              }
            }
          ]
        }],
        systemInstruction: { parts: [{ text: imageSystemInstruction }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              subject_details: {
                type: "OBJECT",
                properties: {
                  main_subject: {
                    type: "OBJECT",
                    properties: {
                      identity: { type: "STRING" },
                      pose: { type: "STRING" },
                      expression: { type: "STRING" },
                      micro_details: { type: "STRING" }
                    },
                    required: ["identity", "pose", "expression", "micro_details"]
                  },
                  attire_and_style: {
                    type: "OBJECT",
                    properties: {
                      clothing: { type: "STRING" },
                      materials: { type: "STRING" },
                      accessories: { type: "STRING" }
                    },
                    required: ["clothing", "materials", "accessories"]
                  }
                },
                required: ["main_subject", "attire_and_style"]
              },
              environment_and_background: {
                type: "OBJECT",
                properties: {
                  location: { type: "STRING" },
                  background_elements: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                  },
                  depth_layers: {
                    type: "OBJECT",
                    properties: {
                      foreground: { type: "STRING" },
                      midground: { type: "STRING" },
                      background: { type: "STRING" }
                    },
                    required: ["foreground", "midground", "background"]
                  }
                },
                required: ["location", "background_elements", "depth_layers"]
              },
              composition_and_camera: {
                type: "OBJECT",
                properties: {
                  shot_type: { type: "STRING" },
                  camera_angle: { type: "STRING" },
                  lens_spec: { type: "STRING" },
                  framing_rule: { type: "STRING" }
                },
                required: ["shot_type", "camera_angle", "lens_spec", "framing_rule"]
              },
              lighting_and_atmosphere: {
                type: "OBJECT",
                properties: {
                  primary_light: { type: "STRING" },
                  secondary_light: { type: "STRING" },
                  rim_light: { type: "STRING" },
                  mood: { type: "STRING" },
                  color_palette: {
                    type: "OBJECT",
                    properties: {
                      primary_hex: { type: "STRING" },
                      secondary_hex: { type: "STRING" },
                      accent_hex: { type: "STRING" },
                      background_hex: { type: "STRING" }
                    },
                    required: ["primary_hex", "secondary_hex", "accent_hex", "background_hex"]
                  }
                },
                required: ["primary_light", "secondary_light", "rim_light", "mood", "color_palette"]
              },
              rendering_and_quality: {
                type: "OBJECT",
                properties: {
                  art_style: { type: "STRING" },
                  texture_quality: { type: "STRING" },
                  engine_modifiers: { type: "STRING" },
                  negative_prompt: { type: "STRING" }
                },
                required: ["art_style", "texture_quality", "engine_modifiers", "negative_prompt"]
              }
            },
            required: [
              "subject_details",
              "environment_and_background",
              "composition_and_camera",
              "lighting_and_atmosphere",
              "rendering_and_quality"
            ]
          }
        }
      };
    }

    const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP Error Status: ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const response = await fetchWithRetry(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsedData = JSON.parse(text);
        setPromptData(parsedData);
        showToast("지능형 구조화 번역 및 프롬프트 확장이 완료되었습니다!");
      } else {
        throw new Error("올바른 응답 데이터를 받지 못했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("프롬프트를 생성하는 도중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  // 클립보드 복사 유틸리티 함수
  function handleCopyToClipboard(textToCopy, message = "구조화 JSON 텍스트가 복사되었습니다!") {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast(message);
    } catch (err) {
      console.error("클립보드 복사 실패", err);
    }
    document.body.removeChild(textArea);
  }

  function handlePrevStep() {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  }

  function handleNextStep() {
    if (activeStep < 4) setActiveStep(activeStep + 1);
  }

  const stepTitles = [
    { title: "피사체 정보", desc: "주요 대상, 포즈, 표정, 의상 세부 묘사" },
    { title: "배경 & 깊이", desc: "위치, 전경/중경/원경, 구성 요소" },
    { title: "구도 & 카메라", desc: "카메라 앵글, 샷 구성, 렌즈 스펙" },
    { title: "조명 & 색상", desc: "빛의 방향과 색감, 헥스 컬러 팔레트" },
    { title: "품질 & 제외단어", desc: "엔진 모디파이어, 제외할 부정문 설정" }
  ];

  return (
    <div className="lg:h-screen lg:overflow-hidden bg-[#fafbfc] text-slate-900 flex flex-col font-premium selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 스타일 및 키프레임 애니메이션 정의 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-premium {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        @keyframes slideInCard {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-card-slide {
          animation: slideInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        /* 3D 자이로 플로팅 원근 가속 속성 */
        .perspective-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* 좌측 카드: 마우스 모션을 배제하여 포커스 해제 및 입력 잠금 버그 원천 해결 */
        .card-3d-left {
          background-color: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.7);
          border-radius: 1.5rem;
          box-shadow: 0 15px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 12px -4px rgba(15, 23, 42, 0.03);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .card-3d-left:hover {
          border-color: rgba(16, 185, 129, 0.25);
          box-shadow: 0 25px 45px -12px rgba(15, 23, 42, 0.12);
        }

        /* 우측 카드: 플로팅 3D 변형 유지 및 최적화 */
        .card-3d-right {
          background-color: #ffffff;
          border: 1px solid rgba(16, 185, 129, 0.12);
          border-radius: 1.5rem;
          box-shadow: 0 20px 40px -12px rgba(4, 47, 31, 0.05);
          transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.2s ease;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .input-premium-hover {
          transition: all 0.2s ease;
        }
        .input-premium-hover:hover {
          border-color: rgba(16, 185, 129, 0.35);
        }
        .input-premium-hover:focus {
          border-color: rgba(16, 185, 129, 0.6);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
        }
      `}</style>

      {/* 토스트 알림창 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row lg:h-screen overflow-hidden">
        
        {/* ==================== LEFT SIDE (입력 및 컨셉 생성 영역) ==================== */}
        <section className="w-full lg:w-[42%] p-6 md:p-8 lg:p-10 flex flex-col justify-between bg-white border-r border-slate-100 lg:h-full overflow-y-auto no-scrollbar">
          
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            
            {/* 상단 브랜딩 로고 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-950 rounded-xl text-white">
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">Promptai</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md">PRO Studio</span>
              </div>
              <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
                <span className="bg-slate-950 hover:bg-slate-900 text-white py-1.5 px-3.5 rounded-full flex items-center space-x-1 cursor-pointer transition-all">
                  <span>Beta Docs</span>
                </span>
              </div>
            </div>

            {/* 작업 모드 셀렉터 */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center space-x-1 max-w-sm">
              <button
                onClick={() => { setInputMode('text'); setError(null); }}
                className={`flex-1 text-xs py-2.5 rounded-xl font-extrabold transition-all duration-300 ${
                  inputMode === 'text'
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Text to Image
              </button>
              <button
                onClick={() => { setInputMode('edit'); setError(null); }}
                className={`flex-1 text-xs py-2.5 rounded-xl font-extrabold transition-all duration-300 ${
                  inputMode === 'edit'
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Image Edit (수정)
              </button>
            </div>

            {/* 타이틀 헤더 */}
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 font-bold uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">
                <span>Intelligent Structuring</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-950 leading-tight">
                {inputMode === 'text' ? '상상 속 이미지를 스키마로 번역' : '기존 이미지 구조 변경 & 추가 묘사'}
              </h2>
            </div>

            {/* 모드별 입력란 */}
            {inputMode === 'text' ? (
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Concept Seed (한글/영문 요약 설명)</label>
                  <button
                    onClick={handleRandomize}
                    className="text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 py-1.5 px-3.5 rounded-full flex items-center space-x-1 transition-all duration-200 transform active:scale-95"
                  >
                    <span>랜덤 아이디어 셔플</span>
                  </button>
                </div>

                {/* 플로팅 효과가 제거되어 입력 상태가 활성화되고 고정된 고급 정적 드롭 쉐도우 카드가 배치됨 */}
                <div 
                  className="card-3d-left p-1 flex-1 min-h-[140px] md:min-h-[160px] overflow-visible"
                >
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="예: 네온 사인이 반짝이는 우천 속 사이버펑크 골목길에서 홀로 라멘을 먹고 있는 고양이 안드로이드"
                    className="w-full h-full min-h-[120px] bg-transparent border-none rounded-3xl p-4 text-sm text-slate-900 placeholder-slate-400 outline-none resize-none font-medium leading-relaxed"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">분석 대상 원본 이미지 업로드</label>
                  {!uploadedImage ? (
                    <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/10 rounded-2xl p-4 transition-all flex flex-col items-center justify-center cursor-pointer relative min-h-[90px]">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <svg className="w-5 h-5 text-slate-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[10px] text-slate-500 font-bold">이미지를 클릭하거나 드래그하여 업로드</span>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-emerald-100 bg-[#fbfdfc] p-2.5 flex items-center justify-between shadow-sm min-h-[90px]">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={uploadedImage} 
                          alt="업로드 이미지" 
                          className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                        />
                        <div>
                          <span className="text-xs font-bold text-emerald-800 block">업로드된 이미지</span>
                          <span className="text-[10px] text-slate-400 leading-none block mt-0.5">구도와 컨텍스트가 AI에 보존됩니다.</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleRemoveImage}
                        className="text-xs text-red-500 hover:text-red-700 font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all mr-1"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">이미지 수정 및 개조 사양서 (Edit Specification)</label>
                  {/* 수정 모드 좌측 카드 플로팅 효과가 제거되어 입력 성능 완치 */}
                  <div 
                    className="card-3d-left p-1 flex-1 min-h-[90px] overflow-visible"
                  >
                    <textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="예: 캐릭터가 쓰고 있는 투구를 투명한 유리 바이저로 교체하고, 어깨 보호대에 밝게 빛나는 파란 장식 패턴을 그려 넣어줘"
                      className="w-full h-full min-h-[80px] bg-transparent border-none rounded-3xl p-4 text-sm text-slate-900 placeholder-slate-400 outline-none resize-none font-medium leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 촬영 기기 / 카메라 렌즈 설정 */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">디바이스 / 카메라 시그니처 감성</span>
              <div className="relative">
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-sm py-2.5 px-4 pr-10 rounded-xl outline-none focus:border-emerald-600 appearance-none shadow-sm cursor-pointer font-semibold transition-all hover:bg-slate-50"
                >
                  {cameraCategories.map((cat) => (
                    <optgroup key={cat.category} label={cat.category} className="text-slate-400 font-bold bg-white text-xs py-1">
                      {cat.options.map((opt) => (
                        <option key={opt.id} value={opt.id} className="text-slate-800 font-medium text-sm">
                          {opt.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 화풍 프리셋 버튼 그룹 */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Artistic Style Preset (화풍 스타일)</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(stylePresets).map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`text-[11px] py-2 px-3.5 rounded-full border transition-all duration-200 transform active:scale-95 ${
                      selectedStyle === style
                        ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 화면비 설정 옵션 및 타겟 플랫폼 옵션 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">가로세로 비율 (Aspect Ratio)</span>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
                  {['1:1', '16:9', '9:16', '4:3'].map((ar) => (
                    <button
                      key={ar}
                      onClick={() => setAspectRatio(ar)}
                      className={`text-[10px] py-1.5 rounded-lg font-bold transition-all ${
                        aspectRatio === ar
                          ? 'bg-white text-slate-950 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">타겟 AI 플랫폼</span>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                  {['Midjourney', 'SD', 'Normal'].map((plat) => {
                    const mapped = plat === 'SD' ? 'Stable Diffusion' : plat;
                    return (
                      <button
                        key={plat}
                        onClick={() => setTargetPlatform(mapped)}
                        className={`text-[9px] py-1.5 rounded-lg font-bold transition-all truncate px-0.5 ${
                          targetPlatform === mapped
                            ? 'bg-emerald-800 text-white shadow-sm font-black'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {plat === 'Midjourney' ? 'MJ v8' : plat === 'SD' ? 'SD' : 'Normal'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* 생성 가동 실행 버튼 */}
            <div className="pt-2">
              <button
                onClick={generatePrompt}
                disabled={isLoading || !userPrompt.trim()}
                className="w-full inline-flex items-center justify-between bg-emerald-950 hover:bg-emerald-900 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-6 rounded-full shadow-lg transition-all duration-300 transform active:scale-95"
              >
                <span className="text-xs tracking-wider">
                  {isLoading ? '구조화 프롬프트 생성 진행 중...' : '구조화 프롬프트 컴파일하기'}
                </span>
                <div className="bg-emerald-400 text-slate-950 p-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl text-xs font-semibold leading-relaxed">
                {error}
              </div>
            )}
          </div>

        </section>

        {/* ==================== RIGHT SIDE (대시보드 에디터 및 완성 프롬프트 출력 영역) ==================== */}
        <section className="w-full lg:w-[58%] p-6 md:p-8 lg:p-10 bg-[#f4faf7] text-slate-800 relative flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-emerald-100/50 lg:h-full lg:overflow-hidden">
          
          {/* 우측 워크스페이스 탭 컨트롤러 */}
          <div className="relative z-10 flex justify-between items-center pb-5 border-b border-emerald-100">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-black tracking-widest text-emerald-800 uppercase">HOLOGRAPHIC STUDIO WORKSPACE</span>
            </div>
            
            {/* 상단 3단 스위치 탭바 */}
            <div className="bg-white border border-emerald-100 p-1 rounded-full flex items-center space-x-1 shadow-sm">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`text-[11px] px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <span>대시보드 에디터</span>
              </button>
              <button
                onClick={() => setActiveTab('compiled')}
                className={`text-[11px] px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 ${
                  activeTab === 'compiled'
                    ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <span>자연어 프롬프트</span>
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`text-[11px] px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 ${
                  activeTab === 'json'
                    ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <span>JSON 구조</span>
              </button>
            </div>
          </div>

          {/* 메인 에디팅 공간 */}
          <div className="relative z-10 flex-1 py-5 flex flex-col justify-between gap-5 overflow-visible perspective-container">
            
            {activeTab === 'dashboard' ? (
              <div className="space-y-4 flex-1 flex flex-col justify-between overflow-visible">
                
                {/* 5개 카드 퀵 이동 내비게이션 */}
                <div className="flex justify-center items-center space-x-2 pb-1.5 no-scrollbar overflow-x-auto">
                  {stepTitles.map((step, idx) => {
                    const isActive = activeStep === idx;
                    const stepNum = `0${idx + 1}`;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`px-4 py-2 flex items-center space-x-2 rounded-xl transition-all duration-200 border transform active:scale-95 shrink-0 ${
                          isActive
                            ? 'bg-emerald-700 border-emerald-700 text-white font-black shadow-md'
                            : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-slate-200/60 shadow-sm'
                        }`}
                      >
                        <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                          {stepNum}
                        </span>
                        <span className="text-xs font-bold tracking-tight">
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 활성 에디팅 카드 영역: 마우스 좌표를 실시간 추적하여 그림자 왜곡과 회전을 최적화하고 잘림 버그 완치 */}
                <div 
                  key={activeStep}
                  style={rightCardStyle}
                  onMouseMove={(e) => handleCardTilt(e, setRightCardStyle, true)}
                  onMouseLeave={() => resetCardTilt(setRightCardStyle)}
                  className="card-3d-right p-5 md:p-6 flex-1 flex flex-col justify-between animate-card-slide overflow-visible"
                >
                  
                  {/* 카드 헤더 */}
                  <div className="border-b border-emerald-50 pb-4 mb-2 flex justify-between items-center select-none">
                    <div>
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest">PROMPT SECTION STEP 0{activeStep + 1} / 05</span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">{stepTitles[activeStep].title}</h3>
                      <p className="text-[11px] text-slate-400">{stepTitles[activeStep].desc}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 hidden md:inline">
                      {["subject_details", "environment_and_background", "composition_and_camera", "lighting_and_atmosphere", "rendering_and_quality"][activeStep]}
                    </span>
                  </div>

                  {/* 카드 에디터 바디 (내부 컨테이너만 독립 스크롤 처리하여 외부 드롭쉐도우 간섭 완전 차단) */}
                  <div className="flex-1 py-3 space-y-5 overflow-y-auto max-h-[300px] lg:max-h-[320px] pr-1 no-scrollbar min-h-0">
                    
                    {/* STEP 1: 피사체 세부 정보 */}
                    {activeStep === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">메인 피사체 정체성 (Identity)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.main_subject?.identity || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'main_subject', 'identity', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">포즈 및 동작 (Pose / Action)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.main_subject?.pose || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'main_subject', 'pose', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">표정 및 감정 (Expression)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.main_subject?.expression || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'main_subject', 'expression', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">세부 정밀 묘사 (Micro Details)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.main_subject?.micro_details || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'main_subject', 'micro_details', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">의상 유형 (Clothing)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.attire_and_style?.clothing || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'attire_and_style', 'clothing', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">재질 및 원단감 (Materials)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.attire_and_style?.materials || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'attire_and_style', 'materials', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <span className="text-xs text-slate-600 font-bold uppercase block">장신구 및 탑재 장비 (Accessories)</span>
                          <input 
                            type="text" 
                            value={promptData.subject_details?.attire_and_style?.accessories || ""}
                            onChange={(e) => updateSubNestedField('subject_details', 'attire_and_style', 'accessories', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 2: 배경 환경 및 공간 깊이 */}
                    {activeStep === 1 && (
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">핵심 공간 환경 (Location / Set)</span>
                          <input 
                            type="text" 
                            value={promptData.environment_and_background?.location || ""}
                            onChange={(e) => updateNestedField('environment_and_background', 'location', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">전경 레이어 (Foreground)</span>
                            <input 
                              type="text" 
                              value={promptData.environment_and_background?.depth_layers?.foreground || ""}
                              onChange={(e) => updateSubNestedField('environment_and_background', 'depth_layers', 'foreground', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">중경 레이어 (Midground)</span>
                            <input 
                              type="text" 
                              value={promptData.environment_and_background?.depth_layers?.midground || ""}
                              onChange={(e) => updateSubNestedField('environment_and_background', 'depth_layers', 'midground', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">원경 레이어 (Background)</span>
                            <input 
                              type="text" 
                              value={promptData.environment_and_background?.depth_layers?.background || ""}
                              onChange={(e) => updateSubNestedField('environment_and_background', 'depth_layers', 'background', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                        </div>

                        {/* 배경 구성 오브젝트 태그 관리 시스템 */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-600 font-bold uppercase">배경 속 구성 오브젝트 태그</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="text"
                              value={newBgElement}
                              onChange={(e) => setNewBgElement(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  addArrayItem('environment_and_background', 'background_elements', newBgElement);
                                  setNewBgElement('');
                                }
                              }}
                              placeholder="추가할 배경 요소 입력 후 Enter"
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-emerald-500 input-premium-hover"
                            />
                            <button
                              onClick={() => {
                                addArrayItem('environment_and_background', 'background_elements', newBgElement);
                                setNewBgElement('');
                              }}
                              className="bg-emerald-600 text-white font-bold text-xs py-2 px-4 rounded-xl hover:bg-emerald-700 transition-all"
                            >
                              추가
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mt-2 max-h-[100px] overflow-y-auto pr-1">
                            {promptData.environment_and_background?.background_elements?.map((element, idx) => (
                              <span key={idx} className="inline-flex items-center space-x-1.5 bg-emerald-50/70 border border-emerald-100 rounded-lg px-2.5 py-1.5 text-xs text-emerald-950 font-medium select-none animate-card-slide">
                                <span>{element}</span>
                                <button 
                                  onClick={() => removeArrayItem('environment_and_background', 'background_elements', idx)}
                                  className="text-emerald-600 hover:text-red-500 font-extrabold transition-colors"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: 구도 및 카메라 렌즈 */}
                    {activeStep === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">종류 / 구도 설정 (Shot Type)</span>
                          <input 
                            type="text" 
                            value={promptData.composition_and_camera?.shot_type || ""}
                            onChange={(e) => updateNestedField('composition_and_camera', 'shot_type', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">렌즈 앵글 각도 (Camera Angle)</span>
                          <input 
                            type="text" 
                            value={promptData.composition_and_camera?.camera_angle || ""}
                            onChange={(e) => updateNestedField('composition_and_camera', 'camera_angle', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <span className="text-xs text-slate-600 font-bold uppercase block">카메라 디바이스 세부 렌즈 명세 (Lens / Camera Spec)</span>
                          <textarea 
                            rows="2"
                            value={promptData.composition_and_camera?.lens_spec || ""}
                            onChange={(e) => updateNestedField('composition_and_camera', 'lens_spec', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm resize-none input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <span className="text-xs text-slate-600 font-bold uppercase block">프레이밍 기하학 배치 규칙 (Framing Rule)</span>
                          <input 
                            type="text" 
                            value={promptData.composition_and_camera?.framing_rule || ""}
                            onChange={(e) => updateNestedField('composition_and_camera', 'framing_rule', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 4: 조명 설계 및 컬러 스와치 */}
                    {activeStep === 3 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">주 광원 설정 (Primary Light)</span>
                            <input 
                              type="text" 
                              value={promptData.lighting_and_atmosphere?.primary_light || ""}
                              onChange={(e) => updateNestedField('lighting_and_atmosphere', 'primary_light', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">보조 채움 광원 (Secondary Light)</span>
                            <input 
                              type="text" 
                              value={promptData.lighting_and_atmosphere?.secondary_light || ""}
                              onChange={(e) => updateNestedField('lighting_and_atmosphere', 'secondary_light', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">실루엣 역광 기법 (Rim Light)</span>
                            <input 
                              type="text" 
                              value={promptData.lighting_and_atmosphere?.rim_light || ""}
                              onChange={(e) => updateNestedField('lighting_and_atmosphere', 'rim_light', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">공기 및 대기감 분위기 (Mood)</span>
                            <input 
                              type="text" 
                              value={promptData.lighting_and_atmosphere?.mood || ""}
                              onChange={(e) => updateNestedField('lighting_and_atmosphere', 'mood', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                        </div>

                        {/* 컬러 팔레트 피커 시스템 */}
                        <div className="pt-4 border-t border-slate-100">
                          <span className="text-xs text-slate-600 font-extrabold uppercase block mb-3 select-none">Color Palette Swatches (주조색 추출)</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['primary_hex', 'secondary_hex', 'accent_hex', 'background_hex'].map((key) => {
                              const colVal = promptData.lighting_and_atmosphere?.color_palette?.[key] || "#000000";
                              const labelMap = { 
                                primary_hex: 'Primary', 
                                secondary_hex: 'Secondary', 
                                accent_hex: 'Accent', 
                                background_hex: 'Background' 
                              };
                              return (
                                <div 
                                  key={key} 
                                  className="flex flex-col items-center bg-[#fbfdfc] border border-emerald-100 rounded-xl p-2.5 hover:shadow-sm transition-shadow"
                                >
                                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-tight mb-1">{labelMap[key]}</span>
                                  
                                  <div className="relative w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer mb-2">
                                    <input 
                                      type="color" 
                                      value={sanitizeHexForPicker(colVal)}
                                      onChange={(e) => updateSubNestedField('lighting_and_atmosphere', 'color_palette', key, e.target.value)}
                                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer rounded-full"
                                    />
                                    <div 
                                      className="w-6 h-6 rounded-full" 
                                      style={{ backgroundColor: colVal }}
                                    />
                                  </div>
                                  
                                  <span className="text-[10px] font-mono text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">{colVal}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: 품질 보정 및 제외 네거티브 문구 */}
                    {activeStep === 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">렌더링 아트 스타일 (Art Style)</span>
                            <input 
                              type="text" 
                              value={promptData.rendering_and_quality?.art_style || ""}
                              onChange={(e) => updateNestedField('rendering_and_quality', 'art_style', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-bold uppercase block">질감 극대화 퀄리티 (Texture Quality)</span>
                            <input 
                              type="text" 
                              value={promptData.rendering_and_quality?.texture_quality || ""}
                              onChange={(e) => updateNestedField('rendering_and_quality', 'texture_quality', e.target.value)}
                              className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">엔진 가속 하이퍼 파라미터 (Engine Modifiers)</span>
                          <input 
                            type="text" 
                            value={promptData.rendering_and_quality?.engine_modifiers || ""}
                            onChange={(e) => updateNestedField('rendering_and_quality', 'engine_modifiers', e.target.value)}
                            className="w-full bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none shadow-sm input-premium-hover"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs text-slate-600 font-bold uppercase block">제외할 요소 지정 (Negative Prompt)</span>
                          <textarea 
                            rows="2"
                            value={promptData.rendering_and_quality?.negative_prompt || ""}
                            onChange={(e) => updateNestedField('rendering_and_quality', 'negative_prompt', e.target.value)}
                            className="w-full h-[65px] bg-[#fbfdfc] border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2 text-xs text-slate-800 font-medium outline-none shadow-sm resize-none input-premium-hover"
                            placeholder="예: blurry, generic, deformed wings, distorted face"
                          />
                        </div>
                      </div>
                    )}

                  </div>

                  {/* 카드 제어 푸터 내비게이션 */}
                  <div className="flex justify-between items-center border-t border-emerald-50/80 pt-4 mt-3 select-none">
                    <button
                      onClick={handlePrevStep}
                      disabled={activeStep === 0}
                      className={`text-xs px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                        activeStep === 0
                          ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                          : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                    >
                      <span>이전 섹션</span>
                    </button>

                    <div className="flex space-x-1.5">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setActiveStep(idx)}
                          className={`h-1.5 rounded-full cursor-pointer transition-all ${
                            activeStep === idx 
                              ? 'w-6 bg-emerald-600' 
                              : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextStep}
                      disabled={activeStep === 4}
                      className={`text-xs px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                        activeStep === 4
                          ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                          : 'text-white bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      <span>다음 섹션</span>
                    </button>
                  </div>

                </div>

              </div>
            ) : activeTab === 'compiled' ? (
              
              /* 자연어 완성 프롬프트 복사/조합 컴파일 뷰 */
              <div 
                style={rightCardStyle}
                onMouseMove={(e) => handleCardTilt(e, setRightCardStyle, true)}
                onMouseLeave={() => resetCardTilt(setRightCardStyle)}
                className="card-3d-right p-5 md:p-6 flex-1 flex flex-col justify-between animate-card-slide overflow-visible"
              >
                <div className="space-y-4 flex-1 flex flex-col min-h-0 justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest">PROMPT GENERATOR COMPILER</span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">자연어 완성 프롬프트</h3>
                    <p className="text-xs text-slate-400 mt-1">지정한 모든 조명, 구도, 물리 속성이 이미지 생성 엔진에 전송 가능한 형태로 컴파일되었습니다.</p>
                  </div>

                  <div className="flex-1 bg-white border border-emerald-100 rounded-2xl p-4 md:p-5 text-sm leading-relaxed text-slate-800 font-medium overflow-y-auto max-h-[220px] select-text">
                    {compilePromptString()}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-50">
                    <div className="bg-[#f0f8f4] p-3 rounded-xl border border-emerald-100/30">
                      <span className="text-[10px] text-emerald-800 font-extrabold uppercase block mb-1">프레임워크 타겟</span>
                      <span className="text-xs font-bold text-slate-800 block">
                        {targetPlatform === 'Stable Diffusion' 
                          ? 'Stable Diffusion' 
                          : targetPlatform === 'Normal' 
                            ? 'Normal (순수 프롬프트)' 
                            : 'Midjourney v8'}
                      </span>
                    </div>
                    <div className="bg-[#f0f8f4] p-3 rounded-xl border border-emerald-100/30">
                      <span className="text-[10px] text-emerald-800 font-extrabold uppercase block mb-1">화면 종횡비</span>
                      <span className="text-xs font-bold text-slate-800 block">{aspectRatio}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyToClipboard(compilePromptString(), "자연어 완성형 프롬프트가 클립보드에 복사되었습니다!")}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all duration-200 transform active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>컴파일된 자연어 복사하기</span>
                  </button>
                </div>
              </div>

            ) : (
              /* RAW JSON 코드 터미널 뷰 */
              <div 
                style={rightCardStyle}
                onMouseMove={(e) => handleCardTilt(e, setRightCardStyle, true)}
                onMouseLeave={() => resetCardTilt(setRightCardStyle)}
                className="card-3d-right p-5 md:p-6 font-mono text-xs text-emerald-800 relative overflow-visible flex-1 flex flex-col justify-between min-h-0 animate-card-slide"
              >
                <div className="absolute top-4 right-4 flex space-x-1.5 z-30">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                
                <div className="flex-1 overflow-y-auto max-h-[340px] pr-1 pt-4 no-scrollbar select-text">
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-800">
                    {JSON.stringify(promptData, null, 2)}
                  </pre>
                </div>

                <div className="border-t border-emerald-50/70 pt-4 flex space-x-2">
                  <button
                    onClick={() => handleCopyToClipboard(JSON.stringify(promptData, null, 2), "JSON 구문이 클립보드에 복사되었습니다!")}
                    className="flex-1 py-2.5 bg-[#eefaf4] hover:bg-emerald-100/60 text-emerald-950 text-[11px] font-bold rounded-xl transition-all"
                  >
                    구조화 JSON 복사
                  </button>
                  <button
                    onClick={downloadJsonFile}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-xl transition-all"
                  >
                    JSON 파일 내보내기
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* 하단 정보창 위젯 */}
          <div className="relative z-10 border-t border-emerald-100/60 pt-4 flex justify-between items-center bg-[#eaf5f0]/40 px-4 py-3 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#ffb938] shrink-0 animate-pulse"></span>
              <span className="text-[10px] text-emerald-800 font-mono font-bold leading-none">활성 렌더러: Unreal Engine 5 가속화 패스 적용됨</span>
            </div>
            
            <button
              onClick={() => handleCopyToClipboard(JSON.stringify(promptData, null, 2), "전체 구조화 JSON 텍스트가 클립보드에 복사되었습니다!")}
              className={`text-xs px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all duration-200 transform active:scale-95 ${
                copied 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              }`}
            >
              <span>{copied ? "복사 성공!" : "전체 JSON 구조 복사"}</span>
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}