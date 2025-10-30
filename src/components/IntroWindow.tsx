const IntroWindow = () => {
  return (
    <div className="window absolute z-10 right-10 top-10">
      {/* Title Bar */}
      <div className="title-bar">
        <div className="title-bar-text">Intro</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      {/* Window Body */}
      <div className="window-body">
        <h1 className="text-2xl font-bold">Hello, I&apos;m Donghan Kim</h1>
        <p className="text-sm text-gray-500">
          I&apos;m junior developer, interested in web development.
        </p>
      </div>
    </div>
  );
};

export default IntroWindow;
