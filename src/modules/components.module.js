import { BackgroundModule } from './background.module';
import { RandomQuoteModule } from './random-quote.module';
import { CustomMessageModule } from './custom-message.module';
import { ClicksModule } from './clicks.module';
import { FigureModule } from './figure.module';
import { ImagesModule } from './images.module';
import { SoundModule } from './sound.module';

export const components = {
	backgroundModule: new BackgroundModule('backgroundModule','Поменять цвет фона'),
	customMessageModule: new CustomMessageModule('customMessageModule','Вызвать сообщение'),
	clicksModule: new ClicksModule('clicksModule', 'Считать клики (за 5 секунд)'),
	figureModule: new FigureModule('figureModule', 'Создать фигуру'),
	randomQuoteModule: new RandomQuoteModule('randomQuoteModule', 'Прочитать цитату'),
	imagesModule: new ImagesModule('imagesModule', 'Посмотреть картинки'),
	soundModule: new SoundModule('soundModule', 'Случайный звук')
};
