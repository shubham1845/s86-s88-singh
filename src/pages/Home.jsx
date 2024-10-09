import Banner from "../components/Banner";

export default function Home() {
  const data = {
    title: "My Blog App",
    content: "Daily Blogs ",
    destination: "/",
    buttonLabel: "See now!",
  };

  return (
    <>
      <Banner data={data} />
      {/* <Highlights /> */}
    </>
  );
}
