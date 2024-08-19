"use client";
import Head from "next/head";
import Navbar from "@/components/Navbarowner";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footerowner";
import { getUser } from "@/components/UserInfo";
import RootLayout from "@/app/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { viewCarDetails } from "@/app/services/api";

type UserName = {
  name: string;
  role: string;
};

interface TermOfUseResponse {
  [key: string]: boolean;
}

interface AdditionalFunctionResponse {
  [key: string]: boolean;
}

const EditCar: React.FC = () => {
  const [image, setImage] = useState(null);
  const id = useParams();
  const [url, setUrl] = useState("");
  const [car, setCar] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    numberofseats: "", // Sử dụng chuỗi để tránh lỗi với giá trị số trống
    productionyears: "",
    tranmissiontype: "",
    fueltype: "",
    mileage: "",
    fuelconsumption: "",
    baseprice: "",
    deposite: "",
    address: "",
    descripton: "",
    images: "",
    status: "Available",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [res, setRes] = useState("");
  const router = useRouter();

  const REACT_APP_CLOUDINARY_CLOUD_NAME = "vanthuc";
  const REACT_APP_CLOUDINARY_API_SECRET = "TtV28amUWGGl281c4ACPJASZPgM";
  const REACT_APP_CLOUDINARY_API_KEY = "143549995223456";
  const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "xqpaviob";

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    if (
      !image ||
      !REACT_APP_CLOUDINARY_UPLOAD_PRESET ||
      !REACT_APP_CLOUDINARY_CLOUD_NAME
    ) {
      console.error("No image selected");
      return;
    }
    data.append("file", image);
    data.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      ).then((res) => res.json());
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };

  let [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    numberofseats: "", // Sử dụng chuỗi để tránh lỗi với giá trị số trống
    productionyears: "",
    tranmissiontype: "",
    fueltype: "",
    mileage: "",
    fuelconsumption: "",
    baseprice: "",
    deposite: "",
    address: "",
    descripton: "",
    images: "",
    status: "Available",
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id?.idcar) {
        console.error("idcar is null or undefined");
        setLoading(false);
        return;
      }

      try {
        const carDetailsResponse = await viewCarDetails(Number(id.idcar));

        if (carDetailsResponse?.error) {
          throw new Error("API returned an error");
        }

        setFormData(carDetailsResponse.car);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id?.idcar]);

  //   setFormData(car);

  const handleChange = (event: any) => {
    const { name, value, type } = event.target;
    const newValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event: any) => {
    console.log(id);
    event.preventDefault();
    let data = await uploadImage();
    if (data && data.secure_url) {
      formData.images = data.secure_url;

      try {
        const response = await fetch(
          `http://localhost:8080/car/editcar/${id.idcar}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Thêm token vào header Authorization
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();
        if (result.message === "Success") {
          setRes("Sửa thành công...");
          router.push(`/car_owner/mycar`);
        } else {
          setRes("Sửa sản phẩm thất bại!!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setRes("Sửa sản phẩm thất bại!!");
      }
    } else {
      setRes("Lỗi khi tải ảnh lên Cloudinary.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Color</label>
              <input
                type="text"
                className="form-control"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Number of Seats</label>
              <input
                type="number"
                className="form-control"
                name="numberofseats"
                value={formData.numberofseats}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Production Years</label>
              <input
                type="number"
                className="form-control"
                name="productionyears"
                value={formData.productionyears}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Transmission Type</label>
              <input
                type="text"
                className="form-control"
                name="tranmissiontype"
                value={formData.tranmissiontype}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Fuel Type</label>
              <input
                type="text"
                className="form-control"
                name="fueltype"
                value={formData.fueltype}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Mileage</label>
              <input
                type="number"
                className="form-control"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Fuel Consumption</label>
              <input
                type="text"
                className="form-control"
                name="fuelconsumption"
                value={formData.fuelconsumption}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Base Price</label>
              <input
                type="number"
                className="form-control"
                name="baseprice"
                value={formData.baseprice}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Deposit</label>
              <input
                type="number"
                className="form-control"
                name="deposite"
                value={formData.deposite}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="descripton"
                value={formData.descripton}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen sm:px-8 md:px-16 sm:py-8">
        <div className="container mx-auto max-w-screen-lg h-full">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Click on Upload a File</span>&nbsp;
            </p>
            <input
              id="hidden-input"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label htmlFor="hidden-input" className="cursor-pointer">
              <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                Upload a file
              </div>
            </label>

            <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
              {preview && (
                <img src={preview} alt="preview" className="w-full" />
              )}
            </div>
          </header>
          <div className="flex justify-end pb-8 pt-6 gap-4">
            <button
              onClick={handleResetClick}
              className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
            >
              Reset
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
              <span>Processing...</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {res ? (
        <div className="flex items-center justify-center gap-2">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
          <span>{res}</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100">
        Edit Car
      </button>
    </form>
  );
};

export default EditCar;
