export default function MaintenanceError() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div
        className="flex flex-col h-[100vh] items-center justify-center"
        style={{
          fontFamily:
            'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div>
          <style>{`body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}`}</style>
          <h1 className="next-error-h1 inline-block mr-[20px] pr-[23px] text-[24px] font-[500] align-top leading-[49px]">
            503
          </h1>
          <div className="inline-block">
            <h2 className="m-0 text-[14px] font-[400] leading-[49px]">
              Website is under maintenance!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
