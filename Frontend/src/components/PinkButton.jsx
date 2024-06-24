const PinkButton = ({ name, funktion }) => {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={funktion}
                className="h-16 w-11/12 bg-pink text-circle rounded-full"
            >
                {name}
            </button>
        </div>
    );
};

export default PinkButton;