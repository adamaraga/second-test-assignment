import ReactLoading from "react-loading";

const Loading = ({ button }: { button?: boolean }) => {
  return (
    <>
      {button ? (
        <ReactLoading color="#000" width={30} height={30} type="spin" />
      ) : (
        <div className="loadingCon">
          <ReactLoading color="#fff" width={50} height={50} type="spin" />
        </div>
      )}
    </>
  );
};

export default Loading;
