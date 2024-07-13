import CreatorForm from "../components/CreatorForm";
export default function AddCreator() {
  return (
    <>
      <CreatorForm
        id={0}
        edit={false}
        name={""}
        imgURL={""}
        description={""}
        socialMedia={{
          youtube: "",
          twitter: "",
          instagram: "",
        }}
      />
    </>
  );
}
