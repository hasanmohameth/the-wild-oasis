'use client'
export default function Error({error,reset}) {
  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold text-red-400'>Something went wrong!</h1>
      <p className='text-lg text-red-500'>{error.message}</p>

      <button className='inline-block bg-accent-500 text-red-200 px-6 py-3 text-lg hover:text-white duration-500'

        onClick={reset}
        >
        Try again
      </button>
    </main>
  );
}
