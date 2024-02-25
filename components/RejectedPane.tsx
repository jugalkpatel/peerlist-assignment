import { searchApplicants } from "@/helpers/search";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { selectRejectedApplicants } from "@/stores/applicant-store";
import { useApplicantStore } from "@/stores/applicants-store-provider";
import Card from "./Card";
import { CardsContainer } from "./CardsContainer";
import { Pane } from "./Pane";

export function RejectedPane() {
  const [value] = useQueryParamState<string>("q", "");
  const rejected = useApplicantStore(selectRejectedApplicants);
  const filteredOrder = searchApplicants(String(value), rejected);
  return (
    <Pane variant="REJECTED" count={filteredOrder.length}>
      <CardsContainer>
        {filteredOrder.map((i) => {
          const props = rejected.data[i];
          return (
            <Card
              key={props.id}
              variant={props.jobApplicationProgress.status}
              {...props}
            />
          );
        })}
      </CardsContainer>
    </Pane>
  );
}
