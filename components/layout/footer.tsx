export default function footer() {
  return (
    <footer className="">
      <div className="absolute hidden w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Challenge by{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://github.com/diversis"
            target="_blank"
            rel="noopener noreferrer"
          >
            diversis
          </a>
        </p>
      </div>
    </footer>
  );
}
