import { memo } from 'react'

interface PhotoClusterProps {
  images: [string, string]
  alt: string
}

function PhotoCluster({ images, alt }: PhotoClusterProps) {
  return (
    <div className="group relative flex h-[140px] w-[200px]">
      <img
        src={images[0]}
        alt={`${alt} 1`}
        loading="lazy"
        decoding="async"
        className="absolute left-0 top-2 h-[110px] w-[110px] rounded border-[3px] border-kimono-white object-cover shadow-photo transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2 group-hover:-rotate-6"
        style={{ transform: 'rotate(-3deg) translateX(-5px)' }}
      />
      <img
        src={images[1]}
        alt={`${alt} 2`}
        loading="lazy"
        decoding="async"
        className="absolute left-14 top-0 h-[110px] w-[110px] rounded border-[3px] border-kimono-white object-cover shadow-photo transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:translate-y-1 group-hover:rotate-3"
        style={{ transform: 'rotate(2deg) translateX(10px) translateY(-5px)' }}
      />
    </div>
  )
}

export default memo(PhotoCluster)
