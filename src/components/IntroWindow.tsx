import WindowLayout from './WindowLayout';
import StackIcon from './StackIcon';
import ReactIcon from '../../public/icons/stacks/react_icon.svg';
import NextIcon from '../../public/icons/stacks/next_icon.svg';
import NestIcon from '../../public/icons/stacks/nestJS_icon.svg';
import NodeIcon from '../../public/icons/stacks/nodejs.svg';
import EslintIcon from '../../public/icons/stacks/eslint_icon.svg';

// 나를 소개하는 창
// 이름, 간단한 소개 (한 눈에 들어오도록)

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
        {/* Stacks Section */}
        <section className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Stacks</span>
          <div className="flex flex-row gap-2">
            <StackIcon src={ReactIcon} alt="React" />
            <StackIcon src={NextIcon} alt="Next.js" />
            <StackIcon src={NestIcon} alt="Nest.js" />
            <StackIcon src={NodeIcon} alt="Node.js" />
            <StackIcon src={EslintIcon} alt="Eslint" />
          </div>
        </section>

        {/* Links Section */}
        <section className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Show me more</span>
          <div className="flex flex-row gap-2">
            <button onClick={handleGithubButton}>Github</button>
            <button onClick={handleLinkedinButton}>Linkedin</button>
          </div>
        </section>
      </div>
    </WindowLayout>
  );
};

export default IntroWindow;
