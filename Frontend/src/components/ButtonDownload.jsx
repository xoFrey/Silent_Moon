import { LiaDownloadSolid } from "react-icons/lia";

const ButtonDownload = ({ downloadLink, isDisabled }) => {
  // const downloadUrl =
  //   "https://videos.pexels.com/video-files/4535145/4535145-hd_1080_1920_25fps.mp4";
  const handleDownloadClick = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
  };

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={() => {
          handleDownloadClick(downloadLink);
        }}
      >
        <LiaDownloadSolid
          className=" z-10 absolute right-5 top-5 bg-pink/55 rounded-full p-3"
          size={"50px"}
          fill="#ffffff"
        />
      </button>
    </>
  );
};

export default ButtonDownload;
