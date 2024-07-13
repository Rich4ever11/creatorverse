import CreatorInfoCard from "../components/CreatorInfoCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewCreator() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const renderViewCreator = () => {
    if (state) {
      return (
        <CreatorInfoCard
          id={state.id}
          name={state.name}
          imgURL={state.imgURL}
          description={state.description}
          socialMedia={{
            youtube: state.socialMedia.youtube,
            twitter: state.socialMedia.twitter,
            instagram: state.socialMedia.instagram,
          }}
        />
      );
    } else {
      navigate("/");
    }
  };

  return <>{renderViewCreator()}</>;
}
