"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function MemosPage() {


  const { data, error } = useSWR("https://memo.zty95.com/api/v1/memo?creatorUsername=zty&rowStatus=NORMAL&limit=20", fetcher);

  console.log(data, error);

  return (
    <div>
      <h1>Memos</h1>
    </div>
  );
}
