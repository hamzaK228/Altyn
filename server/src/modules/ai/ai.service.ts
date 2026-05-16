import { PortfolioRepository } from '../portfolio/portfolio.repository.js';

export class AiService {
  constructor(private portfolioRepo: PortfolioRepository) {}

  async processChat(userId: string, message: string) {
    // Mocking an AI response for demonstration
    // In production, this would call OpenAI/Anthropic API with a system prompt and RAG context.
    const lowerMsg = message.toLowerCase();
    
    let response = 'Я получил ваш запрос и анализирую данные...';
    let actions: any[] = undefined;

    if (lowerMsg.includes('почему') && (lowerMsg.includes('упал') || lowerMsg.includes('вырос'))) {
      response = 'Анализ последних новостей показывает, что на цену повлияли макроэкономические данные из США и решения ФРС.';
    } else if (lowerMsg.includes('купи') || lowerMsg.includes('купить')) {
      response = 'Я могу помочь с покупкой. Подтвердите операцию.';
      actions = [
        { label: 'Подтвердить', action: 'buy_gold' }
      ];
    } else if (lowerMsg.includes('совет') || lowerMsg.includes('портфель')) {
      response = 'Ваш портфель сейчас показывает стабильный рост. Рекомендую продолжать придерживаться стратегии DCA.';
    }

    return {
      message: response,
      actions,
    };
  }

  async getForecast() {
    // Mock predictive analytics based on historical data trends
    return {
      trend: 'bullish',
      predictedRange: { min: 9100, max: 9400 },
      factors: [
        'Ожидаемое снижение ставки ФРС',
        'Высокий спрос со стороны центральных банков',
        'Геополитическая напряженность'
      ],
      confidenceScore: 78
    };
  }

  async getSentiment() {
    // Mock sentiment analysis
    return {
      index: 65,
      label: 'Умеренная жадность',
      newsSources: [
        { title: 'Золото тестирует новые максимумы', sentiment: 'positive', source: 'Bloomberg' },
        { title: 'Инвесторы уходят в защитные активы', sentiment: 'positive', source: 'Reuters' },
        { title: 'Укрепление доллара сдерживает рост золота', sentiment: 'negative', source: 'WSJ' }
      ]
    };
  }

  async getPortfolioInsights(userId: string) {
    const portfolio = await this.portfolioRepo.getByUserId(userId);
    const insights = [];

    if (portfolio.balanceKGS > 50000) {
      insights.push({
        id: '1',
        type: 'opportunity',
        message: 'У вас есть свободные средства на балансе (более 50,000 сом). Учитывая текущий позитивный тренд, возможно, стоит увеличить позицию в золоте.',
      });
    }

    if (portfolio.goldWeightG > 100) {
       insights.push({
        id: '2',
        type: 'risk',
        message: 'Ваш портфель сильно сконцентрирован в золоте. Рассмотрите диверсификацию.',
      });
    }

    if (insights.length === 0) {
       insights.push({
        id: '3',
        type: 'neutral',
        message: 'Ваш портфель хорошо сбалансирован.',
      });
    }

    return insights;
  }
}
