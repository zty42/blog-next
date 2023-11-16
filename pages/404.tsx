import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <p>404</p>
      <Link href="/" className="no-underline">
        <div className="hover-link">返回首页</div>
      </Link>
    </div>
  );
}
