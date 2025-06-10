export const groupEnquiryFormSchema = yup.object().shape({
  contactTitle: yup.string().oneOf(["Mr", "Mrs"]),
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  phoneNumber: yup
    .string()
    .required("Phone Number is required.")
    .matches(/^[0-9\s\-\+\(\)]+$/, "Invalid phone number format."),
  email: yup
    .string()
    .email("Invalid email address format.")
    .required("Email Address is required."),
  bookerType: yup.string().oneOf(["personal", "business"]),
  companyName: yup.string().optional(),
  holidayType: yup.string().oneOf(["business", "leisure"]),
  groupVisitReason: yup
    .string()
    .oneOf(["association", "busTour"])
    .required("Group Name is required."),
  hotel: yup.string().required(),
  checkInDate: yup.string().required("Check-in Date is required."),
  checkOutDate: yup
    .string()
    .required("Check-out Date is required.")
    .test(
      "is-after-checkin",
      "Check-out Date cannot be before Check-in Date.",
      function (checkOutDate) {
        const { checkInDate } = this.parent;
        if (!checkInDate || !checkOutDate) {
          return true;
        }
        const inDate = new Date(checkInDate);
        const outDate = new Date(checkOutDate);
        return outDate >= inDate;
      },
    ),
  packageType: yup.string().oneOf(["breakfast", "mealDeal"]).required(),
  stayingWithChildren: yup.bool(),
  accessibleRoom: yup.bool(),
  numOfRooms: yup
    .number()
    .required("Number of Rooms is required.")
    .min(1, "Number of Rooms must be at least 1."),
  additionalInfo: yup.string().max(1024).optional(),
});
