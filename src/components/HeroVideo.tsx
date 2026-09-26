export default function HeroVideo() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-[2rem] border border-ink/10 shadow-[0_35px_80px_-20px_rgba(28,26,23,0.5)] sm:max-w-[420px]">
      <video
        className="aspect-[9/16] w-full object-cover"
        src="/hero-video.mp4"
        poster="/hero-video-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}
