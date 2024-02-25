import { ApplicantStateValue } from "@/stores/counter-store";
import { JobApplicationStatus } from "@/types/common.types";

export function searchApplicants(
  query: string,
  data: ApplicantStateValue,
  type?: JobApplicationStatus
): string[] {
  const result: string[] = [];

  const searchValue = query.toLowerCase();

  for (const key of data.order) {
    const candidate = data.data[key];
    if (
      candidate.name.toLowerCase().includes(searchValue) ||
      candidate.bio.toLowerCase().includes(searchValue) ||
      (type === "APPLIED" &&
        candidate.contact.email.toLowerCase().includes(searchValue)) ||
      (type === "APPLIED" &&
        candidate.contact.phone.toLowerCase().includes(searchValue))
    ) {
      result.push(key);
    }
  }

  return result;
}
