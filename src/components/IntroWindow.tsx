const IntroWindow = () => {
  return (
    <div className="window absolute z-10 right-10 top-10">
      <div className="title-bar">Intro</div>
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
