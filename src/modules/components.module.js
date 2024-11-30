import { BackgroundModule } from './background.module';
import { CustomMessageModule } from './custom-message.module';
import { ClicksModule } from './clicks.module';
import { FigureModule } from './figure.module';
import { ImagesModule } from './images.module';

export const components = {
	backgroundModule: new BackgroundModule(
		'backgroundModule',
		'Поменять цвет фона'
	),
	customMessageModule: new CustomMessageModule(
		'customMessageModule',
		'Вызвать сообщение'
	),
	clicksModule: new ClicksModule('clicksModule', 'Считать клики (за 5 секунд)'),
	figureModule: new FigureModule('figureModule', 'Создать фигуру'),
	imagesModule: new ImagesModule('imagesModule', 'Картинка'),
};
