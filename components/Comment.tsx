import Giscus from "@giscus/react";

export default function Comment() {
  return (
    <>
      <div className="dark-comment">
        <Giscus
          id="comments"
          repo="zty42/comment"
          repoId="R_kgDOKuDEGQ"
          category="Announcements"
          categoryId="DIC_kwDOKuDEGc4Ca_el"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme="dark_tritanopia"
          lang="zh-CN"
          loading="lazy"
        />
      </div>
      <div className="light-comment">
        <Giscus
          id="comments"
          repo="zty42/comment"
          repoId="R_kgDOKuDEGQ"
          category="Announcements"
          categoryId="DIC_kwDOKuDEGc4Ca_el"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme="light_tritanopia"
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </>
  );
}
