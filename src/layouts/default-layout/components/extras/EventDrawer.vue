<template>
  <!--begin::Chat drawer-->
  <div
    id="kt_drawer_event"
    class="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-name="chat"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_drawer_event_toggle"
    data-kt-drawer-close="#kt_drawer_event_close"
  >
    <!--begin::Messenger-->
    <div class="card w-100" id="kt_drawer_event">
      <!--begin::Card header-->
      <div class="card-header pe-5" id="kt_drawer_event_header">
        <!--begin::Title-->
        <div class="card-title">
          <!--begin::User-->
          <div class="d-flex justify-content-center flex-column me-3">
            <h1 class="text-gray-900 mb-3">Create New Event</h1>
          </div>
          <!--end::User-->
        </div>
        <!--end::Title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-icon-primary"
            id="kt_drawer_event_close"
          >
            <KTIcon icon-name="cross" icon-class="fs-2x" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body" id="kt_drawer_event_body">
        <!--begin::Form-->
        <VForm
          class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
          novalidate
          @submit="onSubmitEvent"
          id="kt_create_event_form"
          :validation-schema="eventPayload"
          :initial-values="{ eventName: '', location: '', note: '', date: '' }"
        >
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-900 fs-6"
              >Event Name</label
            >
            <Field
              title="1"
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="eventName"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="eventName" />
              </div>
            </div>
          </div>

          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-900 fs-6"
              >Location</label
            >
            <Field
              tabindex="2"
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="location"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="location" />
              </div>
            </div>
          </div>

          <!--begin::Input group-->
          <div class="fv-row mb-5">
            <label class="form-label fw-bold text-gray-900 fs-6">Date</label>
            <Field
              tabindex="3"
              class="form-control form-control-lg form-control-solid"
              type="date"
              placeholder=""
              name="date"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="date" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-900 fs-6">Note</label>
            <Field
              v-slot="{ field }"
              tabindex="4"
              class="form-control form-control-lg form-control-solid"
              type="area"
              placeholder=""
              name="note"
              autocomplete="off"
            >
              <textarea class="form-control form-control-lg form-control-solid" rows="12" v-bind="field" name="note"/>

            </Field>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="note" />
              </div>
            </div>
          </div>
          <!--end::Input group-->
          <!--begin::Actions-->
          <div class="text-center">
            <button
              id="kt_event_submit"
              ref="submitButton"
              type="submit"
              class="btn btn-lg btn-primary w-100"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
          <!--end::Actions-->
        </VForm>
        <!--end::Form-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Messenger-->
  </div>
  <!--end::Chat drawer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import * as Yup from "yup";
import type { User } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";

export default defineComponent({
  name: "event-drawer",
  components: { ErrorMessage, VForm, Field },
  setup() {
    const submitButton = ref<HTMLButtonElement | null>(null);

    const eventPayload = Yup.object().shape({
      eventName: Yup.string().required().label("Event Name"),
      location: Yup.string().required().label("Location"),
      note: Yup.string().required().label("Note"),
      date: Yup.string().required().label("Date"),
    });

    const onSubmitEvent = async (values: any) => {
      values = values as User;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      // await store.register(values);
      //
      // const error = Object.values(store.errors);

      const error = null;

      if (!error) {
        Swal.fire({
          text: "You have successfully creted an event!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
        });
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger",
          },
        });
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      getAssetPath,
      eventPayload,
      onSubmitEvent,
      submitButton
    };
  },
});
</script>
