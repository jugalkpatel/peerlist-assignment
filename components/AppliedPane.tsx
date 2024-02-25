import { searchApplicants } from "@/helpers/search";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { selectAppliedApplicants } from "@/stores/counter-store";
import { useApplicantStore } from "@/stores/counter-store-provider";
import Card from "./Card";
import { CardsContainer } from "./CardsContainer";
import { Pane } from "./Pane";

export function AppliedPane() {
  const [value] = useQueryParamState<string>("q", "");
  const applied = useApplicantStore(selectAppliedApplicants);
  const filteredOrder = searchApplicants(String(value), applied, "APPLIED");
  return (
    <Pane variant="APPLIED" count={applied.order.length}>
      <CardsContainer>
        {filteredOrder.map((i) => {
          const props = applied.data[i];
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
