import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-full px-4 py-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <div className="mt-5 container">
          <div className="flex mt-6">
            <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
              Oops !
            </p>
            <div className="ml-6">
              <div className="pl-6 border-l border-gray-500">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  404 Page Not Found
                </h2>

                <p className="mt-1 text-lg text-gray-500 dark:text-white">
                  <Link to="" className="text-blue-400">
                    {' '}
                    Go back home{' '}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
