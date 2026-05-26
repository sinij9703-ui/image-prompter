import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getBasePath() {
  if (process.env.BASE_PATH) return process.env.BASE_PATH;

  const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
  if (!repo) return '/';

  // https://<OWNER>.github.io 형태의 사용자/조직 페이지는 루트 base를 사용합니다.
  if (repo === `${owner}.github.io`) return '/';

  // 일반 프로젝트 페이지는 https://<OWNER>.github.io/<REPO>/ 형태입니다.
  return `/${repo}/`;
}

export default defineConfig({
  base: getBasePath(),
  plugins: [react()]
});
