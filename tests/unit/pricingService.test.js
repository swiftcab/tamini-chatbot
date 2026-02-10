const pricingService = require('../../src/services/pricingService');

describe('PricingService', () => {
  describe('calculateAuto', () => {
    const baseData = {
      type: 'Voiture',
      annee: 2020,
      valeur: 5000000,
      usage: 'Personnel',
      sinistre: false,
      marque: 'Toyota'
    };

    it('should return three formula options', async () => {
      const result = await pricingService.calculateAuto(baseData);

      expect(result).toHaveProperty('tiers');
      expect(result).toHaveProperty('tiersPlus');
      expect(result).toHaveProperty('tousRisques');
    });

    it('should include mensuel, annuel, and garanties for each formula', async () => {
      const result = await pricingService.calculateAuto(baseData);

      for (const formula of ['tiers', 'tiersPlus', 'tousRisques']) {
        expect(result[formula]).toHaveProperty('mensuel');
        expect(result[formula]).toHaveProperty('annuel');
        expect(result[formula]).toHaveProperty('garanties');
        expect(result[formula].mensuel).toBeGreaterThan(0);
        expect(result[formula].annuel).toBeGreaterThan(0);
        expect(Array.isArray(result[formula].garanties)).toBe(true);
      }
    });

    it('should have tiers < tiersPlus < tousRisques', async () => {
      const result = await pricingService.calculateAuto(baseData);

      expect(result.tiers.annuel).toBeLessThan(result.tiersPlus.annuel);
      expect(result.tiersPlus.annuel).toBeLessThan(result.tousRisques.annuel);
    });

    it('should apply old vehicle discount (>10 years)', async () => {
      const oldCar = { ...baseData, annee: 2010 };
      const newCar = { ...baseData, annee: 2023 };

      const oldResult = await pricingService.calculateAuto(oldCar);
      const newResult = await pricingService.calculateAuto(newCar);

      expect(oldResult.tousRisques.annuel).toBeLessThan(newResult.tousRisques.annuel);
    });

    it('should apply commercial usage surcharge', async () => {
      const personal = { ...baseData, usage: 'Personnel' };
      const commercial = { ...baseData, usage: 'Commercial' };

      const personalResult = await pricingService.calculateAuto(personal);
      const commercialResult = await pricingService.calculateAuto(commercial);

      expect(commercialResult.tousRisques.annuel).toBeGreaterThan(personalResult.tousRisques.annuel);
    });

    it('should apply taxi surcharge higher than commercial', async () => {
      const commercial = { ...baseData, usage: 'Commercial' };
      const taxi = { ...baseData, usage: 'Taxi' };

      const commercialResult = await pricingService.calculateAuto(commercial);
      const taxiResult = await pricingService.calculateAuto(taxi);

      expect(taxiResult.tousRisques.annuel).toBeGreaterThan(commercialResult.tousRisques.annuel);
    });

    it('should apply sinistre malus', async () => {
      const clean = { ...baseData, sinistre: false };
      const sinistre = { ...baseData, sinistre: true };

      const cleanResult = await pricingService.calculateAuto(clean);
      const sinistreResult = await pricingService.calculateAuto(sinistre);

      expect(sinistreResult.tousRisques.annuel).toBeGreaterThan(cleanResult.tousRisques.annuel);
    });

    it('should calculate mensuel as annuel / 12', async () => {
      const result = await pricingService.calculateAuto(baseData);

      expect(result.tiers.mensuel).toBe(Math.round(result.tiers.annuel / 12));
      expect(result.tiersPlus.mensuel).toBe(Math.round(result.tiersPlus.annuel / 12));
      expect(result.tousRisques.mensuel).toBe(Math.round(result.tousRisques.annuel / 12));
    });
  });

  describe('getRecommendation', () => {
    const tarifs = {
      tiers: { mensuel: 2000, annuel: 24000 },
      tiersPlus: { mensuel: 3250, annuel: 39000 },
      tousRisques: { mensuel: 5000, annuel: 60000 }
    };

    it('should recommend Tiers for old vehicles', () => {
      const data = { annee: 2010, valeur: 2000000 };
      const rec = pricingService.getRecommendation(data, tarifs);
      expect(rec).toContain('Tiers');
    });

    it('should recommend Tous Risques for new expensive vehicles', () => {
      const data = { annee: new Date().getFullYear() - 1, valeur: 8000000 };
      const rec = pricingService.getRecommendation(data, tarifs);
      expect(rec).toContain('Tous Risques');
    });

    it('should recommend Tiers+ for average vehicles', () => {
      const data = { annee: 2019, valeur: 3000000 };
      const rec = pricingService.getRecommendation(data, tarifs);
      expect(rec).toContain('Tiers+');
    });
  });
});
