# Promptai PRO Studio 배포용 프로젝트

업로드한 `json_prompt_studio (2)(2).tsx`를 GitHub Pages에 배포할 수 있도록 Vite + React + Tailwind 프로젝트 형태로 감싼 버전입니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local
# .env.local 안의 VITE_GEMINI_API_KEY 값을 입력
npm run dev
```

## 프로덕션 빌드 확인

```bash
npm run build
npm run preview
```

## GitHub Pages 배포 순서

1. GitHub에서 새 저장소를 만듭니다. 예: `promptai-pro-studio`
2. 이 프로젝트 파일 전체를 저장소에 업로드하거나 push합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
5. 저장소의 **Settings → Secrets and variables → Actions → New repository secret**에서 다음 값을 추가합니다.

```text
Name: VITE_GEMINI_API_KEY
Secret: 본인의 Gemini API Key
```

6. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드 및 배포합니다.

## 중요: Gemini API Key 보안

GitHub Pages는 정적 호스팅이기 때문에 프론트엔드에 들어간 API Key는 사용자가 브라우저에서 볼 수 있습니다. 운영용으로 쓸 경우 Google Cloud Console에서 다음 제한을 권장합니다.

- HTTP referrer 제한: `https://<GitHub아이디>.github.io/*`
- 프로젝트 페이지일 경우: `https://<GitHub아이디>.github.io/<저장소이름>/*`
- API 제한: Gemini API만 허용
- 사용량 예산/쿼터 설정

더 안전한 운영 구조는 Cloudflare Workers, Vercel Serverless Function, Netlify Function 같은 얇은 프록시 API를 두고 키를 서버 측에만 보관하는 방식입니다.

## 파일 구조

```text
.
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

## 배포 URL

일반 저장소로 배포하면 보통 다음 주소가 됩니다.

```text
https://<GitHub아이디>.github.io/<저장소이름>/
```

사용자 페이지 저장소인 `<GitHub아이디>.github.io`로 만들면 다음 주소가 됩니다.

```text
https://<GitHub아이디>.github.io/
```
