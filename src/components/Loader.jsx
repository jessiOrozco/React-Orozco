import {SpinnerRound} from "spinners-react";

function Loader(){
    return(
        <div className="w-full mt-10 flex flex-col justify-center items-center align-middle">
            <SpinnerRound
                size={72}
                thickness={148}
                speed={65}
                color="gray"

            />
        </div>

    )
}

export default Loader;