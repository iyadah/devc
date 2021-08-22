import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyServices, deleteService } from "../../actions/service";
import { Link } from "react-router-dom";

const MyServices = ({ getMyServices, service: { services, loading } }) => {
  useEffect(() => {
    getMyServices();
  }, [getMyServices]);

  return (
    <div>
      My Services list
      <table className="table text-gray-400 border-separate space-y-6 text-sm">
        <thead className="bg-gray-800 text-gray-500">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Deliver Days/Hours</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        {services.map((service) => (
          <tr className="bg-gray-800" key={service._id}>
            <td className="p-4">
              <div class="grid grid-cols-2 divide-x divide-green-500">
                <div>
                  <img
                    className="inline object-cover h-8 rounded-full"
                    src={
                      service.image + "?auto=compress&cs=tinysrgb&h=650&w=940"
                    }
                    alt="Service image"
                  />
                </div>
                <div>{service.title}</div>
              </div>
            </td>
            <td className="p-4">{service.price}</td>
            <td className="p-4">
              {" "}
              {service.serviceDeliveryDay === 0
                ? ""
                : service.serviceDeliveryDay || "-, and"}{" "}
              {service.serviceDeliveryDay === 1
                ? "day "
                : service.serviceDeliveryDay === 0
                ? ""
                : "days "}
              {service.serviceDeliveryHour === 0
                ? ""
                : service.serviceDeliveryHour === 1
                ? "1 hour"
                : service.serviceDeliveryHour + " hours"}
            </td>

            <td className="p-4">
              <a
                href="!#"
                onClick={() => deleteService(service._id)}
                className="text-gray-400 hover:text-gray-100 ml-2"
              >
                <i className="material-icons-round text-base">delete_outline</i>
              </a>
            </td>
          </tr>
        ))}

        <tbody></tbody>
      </table>
    </div>
  );
};

MyServices.propTypes = {
  getMyServices: PropTypes.func.isRequired,
  service: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  service: state.service,
});

export default connect(mapStateToProps, { getMyServices })(MyServices);
