import MultipleItems from "../../common/ImageSlider";

const PopularDestination = () => {
  return (
    <div className="populardestination">
      <div className="destinationtext">
        <h2 className="h2_service">Popular Destination</h2>
        <hr style={{ border: "1.2px solid black", width: "20px" }}></hr>
      </div>
      <div className="imageslider">
        <MultipleItems />
      </div>
    </div>
  );
};

export default PopularDestination;
