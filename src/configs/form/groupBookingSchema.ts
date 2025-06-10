import { FormConfig } from "@/app/types/form";
import { loadLocaleData, Locale } from "@/lib/i18n";
import { flattenLocaleData } from "../../lib/utils";

export const getGroupBookingFormConfig = async (
  locale: Locale,
): Promise<FormConfig> => {
  const formConfig = await loadLocaleData(locale, "groupEnquiryForm.json");
  const t = flattenLocaleData(formConfig);
  return {
    title: t["form.title"],
    description: t["form.description"],
    sections: [
      {
        id: "contact-details-form",
        title: t["form.sections.contactDetails.title"],
        fields: [
          {
            title: t["form.sections.contactDetails.fields.title.title"],
            name: "title",
            label: t["form.sections.contactDetails.fields.title.label"],
            type: "select",
            required: true,
            options: [
              { value: "", label: "" },
              {
                value: "Mr",
                label:
                  t["form.sections.contactDetails.fields.title.options.mr"],
              },
              {
                value: "Mrs",
                label:
                  t["form.sections.contactDetails.fields.title.options.mrs"],
              },
            ],
            requiredMessage:
              t["form.sections.contactDetails.fields.title.requiredMessage"],
          },
          {
            name: "firstName",
            label: t["form.sections.contactDetails.fields.firstName.label"],
            type: "text",
            placeholder:
              t["form.sections.contactDetails.fields.firstName.placeholder"],
            required: false,
          },
          {
            name: "lastName",
            label: t["form.sections.contactDetails.fields.lastName.label"],
            type: "text",
            placeholder:
              t["form.sections.contactDetails.fields.lastName.placeholder"],
            required: true,
          },
          {
            name: "phoneNumber",
            label: t["form.sections.contactDetails.fields.phoneNumber.label"],
            type: "tel",
            placeholder:
              t["form.sections.contactDetails.fields.phoneNumber.placeholder"],
            required: true,
          },
          {
            name: "email",
            label: t["form.sections.contactDetails.fields.email.label"],
            type: "email",
            placeholder:
              t["form.sections.contactDetails.fields.email.placeholder"],
            required: true,
          },
        ],
      },
      {
        id: "form-booking-details",
        title: t["form.sections.bookingDetails.title"],
        fields: [
          {
            name: "bookerType",
            label: t["form.sections.bookingDetails.fields.bookerType.label"],
            title: t["form.sections.bookingDetails.fields.bookerType.title"],
            type: "select",
            required: true,
            options: [
              { value: "", label: "" },
              {
                value: "personal",
                label:
                  t[
                    "form.sections.bookingDetails.fields.bookerType.options.personal"
                  ],
              },
              {
                value: "business",
                label:
                  t[
                    "form.sections.bookingDetails.fields.bookerType.options.business"
                  ],
              },
              {
                value: "Travel Management Company",
                label:
                  t[
                    "form.sections.bookingDetails.fields.bookerType.options.travelManagementCompany"
                  ],
              },
            ],
          },
          {
            name: "companyName",
            label: t["form.sections.bookingDetails.fields.companyName.label"],
            type: "text",
            placeholder:
              t["form.sections.bookingDetails.fields.companyName.placeholder"],
            required: true,
          },
          {
            name: "holidayType",
            label: t["form.sections.bookingDetails.fields.holidayType.label"],
            type: "select",
            required: true,
            options: [
              { value: "", label: "" },
              {
                value: "business",
                label:
                  t[
                    "form.sections.bookingDetails.fields.holidayType.options.business"
                  ],
              },
              {
                value: "leisure",
                label:
                  t[
                    "form.sections.bookingDetails.fields.holidayType.options.leisure"
                  ],
              },
            ],
          },
          {
            title:
              t["form.sections.bookingDetails.fields.groupVisitReason.title"],
            name: "groupVisitReason",
            label:
              t["form.sections.bookingDetails.fields.groupVisitReason.label"],
            type: "select",
            placeholder:
              t[
                "form.sections.bookingDetails.fields.groupVisitReason.placeholder"
              ],
            required: true,
            options: [
              { value: "", label: "" },
              {
                value: "association",
                label:
                  t[
                    "form.sections.bookingDetails.fields.groupVisitReason.options.association"
                  ],
              },
              {
                value: "busTour",
                label:
                  t[
                    "form.sections.bookingDetails.fields.groupVisitReason.options.busTour"
                  ],
              },
            ],
          },
          {
            title: t["form.sections.bookingDetails.fields.hotel.title"],
            label: t["form.sections.bookingDetails.fields.hotel.label"],
            name: "hotel",
            type: "select",
            placeholder:
              t["form.sections.bookingDetails.fields.hotel.placeholder"],
            required: true,
            options: [
              {
                value: "birmingham",
                label:
                  t[
                    "form.sections.bookingDetails.fields.hotel.options.birmingham"
                  ],
              },
              {
                value: "busTour",
                label:
                  t["form.sections.bookingDetails.fields.hotel.options.london"],
              },
            ],
          },
          {
            name: "checkInDate",
            label: t["form.sections.bookingDetails.fields.checkInDate.label"],
            type: "date",
            required: true,
          },
          {
            name: "checkOutDate",
            label: t["form.sections.bookingDetails.fields.checkOutDate.label"],
            type: "date",
            required: true,
          },
          {
            title: t["form.sections.bookingDetails.fields.packageType.title"],
            label: t["form.sections.bookingDetails.fields.packageType.label"],
            name: "packageType",
            type: "radio",
            placeholder:
              t["form.sections.bookingDetails.fields.packageType.placeholder"],
            required: true,
            options: [
              {
                value: "breakfast",
                label:
                  t[
                    "form.sections.bookingDetails.fields.packageType.options.premierInnBreakfast"
                  ],
              },
              {
                value: "mealDeal",
                label:
                  t[
                    "form.sections.bookingDetails.fields.packageType.options.mealDeal"
                  ],
              },
            ],
          },
        ],
      },
      {
        id: "form-room-requirements",
        title: t["form.sections.roomRequirements.title"],
        fields: [
          {
            title:
              t[
                "form.sections.roomRequirements.fields.stayingWithChildren.title"
              ],
            name: "stayingWithChildren",
            label:
              t[
                "form.sections.roomRequirements.fields.stayingWithChildren.label"
              ],
            type: "checkbox",
            required: false,
          },
          {
            name: "accessibleRoom",
            label:
              t["form.sections.roomRequirements.fields.accessibleRoom.label"],
            type: "checkbox",
            required: false,
          },
          {
            name: "numOfRooms",
            label: t["form.sections.roomRequirements.fields.numOfRooms.label"],
            type: "number",
            required: true,
            min: 1,
          },
          {
            name: "additionalInfo",
            label:
              t["form.sections.roomRequirements.fields.additionalInfo.label"],
            type: "textarea",
            required: false,
          },
        ],
      },
    ],
  };
};
