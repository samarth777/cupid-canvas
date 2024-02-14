export default function Result(src) {
  if (src) {
    return (
      <div>
        <img src={src} />
      </div>
    );
  }
  return <p>Image was not generated, please try again!</p>;
}
