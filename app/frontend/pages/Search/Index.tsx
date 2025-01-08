import { Head, Link, usePage } from '@inertiajs/react';

const SearchIndex = () => {
  const { results, q } = usePage<any>().props;
  // 确保results是数组并且每个结果都有正确的结构
  const safeResults = Array.isArray(results) ? results : [];
  return (
    <>
      <Head title="搜索结果" />
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">
          搜索结果: {q}
        </h1>

        {safeResults.length > 0 ? (
          <div className="space-y-6">
            {safeResults.map((result: any) => (
              <div key={result.id} className="p-6 bg-white rounded-lg shadow">
                <Link href={`/posts/${result?.id}`} className="block">
                  <h2 className="mb-2 text-xl font-semibold hover:text-blue-600">
                    {result?.title}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-600">没有找到相关结果</p>
          </div>
        )}
      </div>
    </>
  );
}
export default SearchIndex