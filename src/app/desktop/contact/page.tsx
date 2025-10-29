import WindowLayout from '@/components/WindowLayout';

export default function ContactPage() {
  return (
    <WindowLayout title="연락처">
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">연락처</h1>

      <div className="window mb-4">
        <div className="title-bar">
          <div className="title-bar-text">연락 정보</div>
        </div>
        <div className="window-body">
          <div className="field-row mb-3">
            <label className="font-bold w-20 inline-block">이메일:</label>
            <span>your.email@example.com</span>
          </div>
          <div className="field-row mb-3">
            <label className="font-bold w-20 inline-block">GitHub:</label>
            <a href="https://github.com/yourusername" className="underline">
              github.com/yourusername
            </a>
          </div>
          <div className="field-row mb-3">
            <label className="font-bold w-20 inline-block">LinkedIn:</label>
            <a href="https://linkedin.com/in/yourprofile" className="underline">
              linkedin.com/in/yourprofile
            </a>
          </div>
        </div>
      </div>

      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">메시지 보내기</div>
        </div>
        <div className="window-body">
          <form className="space-y-3">
            <div className="field-row-stacked">
              <label htmlFor="name" className="font-bold">
                이름
              </label>
              <input id="name" type="text" />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="email" className="font-bold">
                이메일
              </label>
              <input id="email" type="email" />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="message" className="font-bold">
                메시지
              </label>
              <textarea id="message" rows={4}></textarea>
            </div>
            <button type="submit">보내기</button>
          </form>
        </div>
      </div>
      </div>
    </WindowLayout>
  );
}
