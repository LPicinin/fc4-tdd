import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund copy";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";


describe("RefundRuleFactory", () => {

    it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", async () => {
        // Arrange & Act
        let refund = RefundRuleFactory.getRefundRule(8);

        // Assert
        expect(refund).toBeInstanceOf(FullRefund);
    });
    it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", async () => {
        // Arrange & Act & Assert
        for(let i = 1; i < 8; i++)
            expect(RefundRuleFactory.getRefundRule(i)).toBeInstanceOf(PartialRefund);
    });
    it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", async () => {
        // Arrange & Act
        let refund = RefundRuleFactory.getRefundRule(0);

        // Assert
        expect(refund).toBeInstanceOf(NoRefund);
    });
});