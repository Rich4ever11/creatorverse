import CreatorForm from "../components/CreatorForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditCreator() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const renderEditCreator = () => {
    console.log(state);
    if (state) {
      return (
        <CreatorForm
          id={state.id}
          edit={state.edit}
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

  return <>{renderEditCreator()}</>;
}
