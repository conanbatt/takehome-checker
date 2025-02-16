import React from "react";
import Link from "next/link";

interface AppInfoWithVideoProps {
  appName: string;
  videoUrl: string;
}

const AppInfoWithVideo: React.FC<AppInfoWithVideoProps> = ({ appName, videoUrl }) => {
  return (
    <div className="text-center pb-8">
      <h2 className="w-full my-6 text-3xl text-center lg:col-span-2">
        {appName} es de{" "}
        <Link
          href="https://ready.silver.dev"
          className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
        >
          Interview Ready
        </Link>
      </h2>
      <p className="mt-0 text-center lg:col-span-2">
        Esta herramienta es parte de un programa integral de preparación de entrevistas.
        <br />
        Puedes ver el formato y más contenido en el video.
      </p>
      <iframe
        className="rounded-lg shadow-lg mt-4 max-w-xs md:max-w-none mx-auto lg:col-span-2"
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default AppInfoWithVideo;
