import { searchApplicants } from "@/helpers/search";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { selectShortlistedApplicants } from "@/stores/counter-store";
import { useApplicantStore } from "@/stores/counter-store-provider";
import Card from "./Card";
import { CardsContainer } from "./CardsContainer";
import { Pane } from "./Pane";

export function ShortlistedPane() {
  const [value] = useQueryParamState<string>("q", "");
  const shortlisted = useApplicantStore(selectShortlistedApplicants);
  const filteredOrder = searchApplicants(String(value), shortlisted);

  return (
    <Pane variant="SHORTLISTED" count={shortlisted.order.length}>
      <CardsContainer>
        {filteredOrder.map((i) => {
          const props = shortlisted.data[i];
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
