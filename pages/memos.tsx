import { NextPage } from "next";
import Head from "next/head";
import { TITLE } from "../config";
import { transMemoMdContent } from "../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import formatDistance from "date-fns/formatDistance";
import { zhCN } from "date-fns/locale";
interface Memo {
  id: number;
  rowStatus: string;
  creatorId: number;
  createdTs: number;
  createAt: string;
  updatedTs: number;
  displayTs: number;
  content: string;
  visibility: string;
  pinned: boolean;
  parent: null;
  creatorName: string;
  creatorUsername: string;
}
export const config = { runtime: 'edge' };

export async function getServerSideProps() {
  const res = await fetch(
    "https://memo.zty95.com/api/v1/memo?creatorId=1&tag=memo"
  );
  const originMemos = await res.json();
  const memos = originMemos.map(async (memo: Memo) => {
    const { content } = memo;
    const mdContent = await transMemoMdContent(content.replace("#memo", ""));
    return {
      ...memo,
      content: mdContent,
      createAt: formatDistance(new Date(memo.createdTs * 1000), new Date(), {
        addSuffix: true,
        locale: zhCN,
      }),
    };
  });
  return {
    props: {
      memos: await Promise.all(memos),
    },
  };
}

interface MemosProps {
  memos: Memo[];
}

const Memo = ({ memo }: { memo: Memo }) => {
  const { content } = memo;
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return (
    <div className="my-4">
      <div className="p-4 rounded-xl bg-white dark:bg-zinc-700">
        <div className="text-sm grid grid-cols-7">
          <div className="min-w-[2.5rem] align-left ">
            <span className="text-sm font-bold w-full">#{memo.id}</span>
          </div>
          <div className="panda-link col-start-2 col-span-3 flex"></div>
          <div className="font-medium italic col-span-1"></div>
          <div className=" col-span-2 flex">
            <time className="italic opacity-70 ml-auto mr-4">
              {memo.createAt}
            </time>
          </div>
        </div>
        <div className="prose prose-stone dark:prose-invert  p-2">
          <Component></Component>
        </div>
      </div>
    </div>
  );
};
const Memos: NextPage<MemosProps> = ({ memos }) => {
  const headTitle = `memos | ${TITLE}`;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className="py-10 w-full max-w-4xl mx-auto">
        {memos.map((memo, index) => {
          return <Memo key={index} memo={memo}></Memo>;
        })}
      </div>
    </>
  );
};

export default Memos;
