import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/dialog";
import ConfirmCheck from "@/components/icons/ConfirmCheck";

const RehashDemo = () => {
  // Set document title and favicon
  document.title = "Demo Form";
  const favicon = document.querySelector(
    "link[rel~='icon']"
  ) as HTMLLinkElement | null;
  if (favicon) {
    favicon.href =
      "https://channelautomation.com/wp-content/uploads/2022/09/cropped-logo-final-192x192.png";
  } else {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href =
      "https://channelautomation.com/wp-content/uploads/2022/09/cropped-logo-final-192x192.png";
    document.head.appendChild(newFavicon);
  }

  const initialValues = {
    firstname: "",
    lastname: "",
    zip: "",
    address1: "",
    city: "",
    email: "",
    phone: "",
    state: "",
    quote: "",
    home_value: "",
    service_id: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    zip: Yup.string().required("Zip code is required"),
    address1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    state: Yup.string().required("State is required"),
    quote: Yup.string().required("Quote is required"),
    home_value: Yup.string().required("Home value is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Structure payload to match webhook expectations
      const payload = {
        fields: {
          firstname: { value: values.firstname },
          lastname: { value: values.lastname },
          phone: { value: '+1'+values.phone },
          quote: { value: values.quote },
          home_value: { value: values.home_value },
          service_id: { value: 1 },
          zip: { value: values.zip },
          address1: { value: values.address1 },
          city: { value: values.city },
          email: { value: values.email },
          state: { value: values.state },
        },
      };

      const response = await fetch(
        "https://app.channelautomation.com/api/iwh/d8230bd5110f0ccf2c23d75d03fe7ccb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Webhook response:", data);
    } catch (error) {
      console.error("Submission error:", error);
    }
    document.getElementById("dialog")?.click();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-full bg-gray-50">
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
          <div className="bg-white rounded-xl shadow p-4 sm:p-7">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800">
                Rehash Demo Inbound Form
              </h2>
              <p className="text-sm text-gray-600">
                Please fill in the details to proceed with the demo
              </p>
            </div>

            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="firstname"
                  type="text"
                  className="form-input"
                  placeholder="John"
                  {...formik.getFieldProps("firstname")}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="lastname"
                  type="text"
                  className="form-input"
                  placeholder="Doe"
                  {...formik.getFieldProps("lastname")}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="zip" className="form-label">
                  Zip Code
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="zip"
                  type="text"
                  className="form-input"
                  placeholder="12345"
                  {...formik.getFieldProps("zip")}
                />
                {formik.touched.zip && formik.errors.zip ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.zip}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="address1" className="form-label">
                  Address
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="address1"
                  type="text"
                  className="form-input"
                  placeholder="123 Main St"
                  {...formik.getFieldProps("address1")}
                />
                {formik.touched.address1 && formik.errors.address1 ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.address1}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="city"
                  type="text"
                  className="form-input"
                  placeholder="New York"
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="sample@email.com"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="phone"
                  type="text"
                  className="form-input"
                  placeholder="123-456-7890"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="state"
                  type="text"
                  className="form-input"
                  placeholder="NY"
                  {...formik.getFieldProps("state")}
                />
                {formik.touched.state && formik.errors.state ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.state}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="quote" className="form-label">
                  Quote
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="quote"
                  type="text"
                  className="form-input"
                  placeholder="1000"
                  {...formik.getFieldProps("quote")}
                />
                {formik.touched.quote && formik.errors.quote ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.quote}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="home_value" className="form-label">
                  Home Value
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="home_value"
                  type="text"
                  className="form-input"
                  placeholder="500000"
                  {...formik.getFieldProps("home_value")}
                />
                {formik.touched.home_value && formik.errors.home_value ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.home_value}
                  </div>
                ) : null}
                </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <div className="flex flex-wrap gap-2 justify-center w-full">
              <button
                type="submit"
                className="w-full py-4 px-3 inline-flex items-center justify-center text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Start Demo"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <Dialog>
        <DialogTrigger asChild>
          <button id="dialog" className="hidden"></button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="items-center">
            <ConfirmCheck />
            <h4 className="text-lg sm:text-xl font-semibold text-center py-1">
              Awesome!
            </h4>
            <DialogDescription>
              Form submitted successfully. The demo will start shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild className="items-center hidden">
              <button className="bg-accentColor hover:bg-accentDark w-full">
                OK
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RehashDemo;
