import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { strings } from '@angular-devkit/core';
import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { PageComponentSchema } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('page-component', () => {


  // 选项 --name的值
  // const name = 'demo-page';
  const runner = new SchematicTestRunner('schematics', collectionPath);

  // 模拟ng new创建angular项目，主要对workspace和application进行配置

  // angular项目的配置
  // const workspaceOptions: WorkspaceOptions = {
  //   name: 'workspace',              // 不重要的名字，随意取，不影响测试结果
  //   newProjectRoot: 'projects',     // 项目app的根目录，可以随意取，但是验证会用到
  //   version: '6.0.0',               // 版本号，随意，不影响测试
  // };
  // const appOptions: ApplicationOptions = {
  //   name: 'page-component',              // 项目名称
  //   inlineStyle: false,             // 以下是项目属性，随意true/false，不影响测试结果
  //   inlineTemplate: false,
  //   routing: false,
  //   style: Style.Css,
  //   skipTests: false,
  //   skipPackageJson: false,
  // };

  const schemaArgs: PageComponentSchema = {
    name: 'demo-page',
    project: 'page-component',
    group: 'demo'
  }

  // 调用 SchematicTestRunner 的 runExternalSchematicAsync 方法，并以给出的参数生成angular项目
  let testTree: UnitTestTree;
  const newOptions: NgNewOptions = {
    name: (schemaArgs.project) as string, // 工作区和项目名称
    directory: './', // 创建工作区所在的目录路径，若未指定，默认会创建一个和工作区同名的目录
    version: '13.3.8' // angular-cli 版本信息
  }

  beforeEach(async () => {
    testTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'ng-new',
      newOptions
    ).toPromise();
  });

  // 最基本的判断,如果生成的文件名和预期生成的文件名一致,就验证成功
  it('works', async () => {

    // runSchematicAsync()参数：schema名称、参数、Tree
    const tree = await runner.runSchematicAsync('page-component', schemaArgs, testTree).toPromise();

    console.log('tree:', testTree.files);
    const { name, group } = schemaArgs;
    const dasherizeName = strings.dasherize(name);
    const dasherizeGroup = strings.dasherize(group);

    /* 以下其实可以直接4个toContain代替*/
    // 预期生成的文件
    const expectFiles = [
      `/src/app/api/${dasherizeGroup}/${dasherizeName}/${dasherizeName}-api.service.ts`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.component.html`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.component.css`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.component.ts`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.component.spec.ts`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.info.ts`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.module.ts`,
      `/src/app/pages/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.service.ts`,
      `/src/mocks/handlers/${dasherizeGroup}/${dasherizeName}/${dasherizeName}.handlers.ts`,
    ]

    // 如果实际模拟的angular项目中拥有预期生成的文件,则将它从expectFiles中移除
    for (const v of tree.files) {
      for (let i = 0; i < expectFiles.length; i++) {
        const e = expectFiles[i];
        if (v.toString() === e) {
          expectFiles.splice(i, 1);
        }
      }
    }

    //如果预期生成的文件都有生成,那么预期的应该是0=0成立
    expect(0).toEqual(expectFiles.length);
  });

  // it('works', async () => {
  //   const runner = new SchematicTestRunner('schematics', collectionPath);
  //   const tree = await runner
  //     .runSchematicAsync('hello-world', {}, Tree.empty())
  //     .toPromise();

  //   expect(tree.files).toEqual([]);
  // });
});