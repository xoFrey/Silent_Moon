import { LiaDownloadSolid } from "react-icons/lia";

const ButtonDownload = ({ downloadLink }) => {
  const downloadUrl = { downloadLink };
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
