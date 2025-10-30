import WindowLayout from './WindowLayout';

const IntroWindow = () => {
  const handleGithubButton = () => {
    window.open('https://github.com/pendant-k', '_blank');
  };
  const handleLinkedinButton = () => {
    window.open('https://www.linkedin.com/in/pendant-k/', '_blank');
  };
  return (
    <WindowLayout
      title="Intro"
      initialPosition={{ x: window.innerWidth - 1000, y: 100 }}
      enableWindowControls={false}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-black">Hello, I&apos;m Donghan Kim</h2>
        <p className="text-lg text-black">
          I&apos;m junior developer, interested in web development.
        </p>
        <span className="text-sm text-gray-500">Show me more</span>
        <section className="flex flex-row gap-2">
          <button onClick={handleGithubButton}>Github</button>
          <button onClick={handleLinkedinButton}>Linkedin</button>
        </section>
      </div>
    </WindowLayout>
  );
};

export default IntroWindow;
