app.component('tabsComponent', {
    bindings:{
        includeList:'@',
        includeForm:'@'
    },
    template:`
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
            <li class="active">
                <a href data-target="#list" data-toggle="tab">
                    <i class="fa fa-bars"></i> Listar
                </a>
            </li>
            <li>
                <a href data-target="#insert" data-toggle="tab">
                    <i class="fa fa-plus"></i> Incluir
                </a>
            </li>
            <li>
                <a href data-target="#update" data-toggle="tab">
                    <i class="fa fa-edit"></i> Alterar
                </a>
            </li>
            <li>
                <a href data-target="#delete" data-toggle="tab">
                    <i class="fa fa-eraser"></i> Excluir
                </a>
            </li>
        </ul>
    </div>
    <div class="tab-content">
        <div class="tab-pane active" id="list" ng-include="$ctrl.includeList"></div>
        <div class="tab-pane" id="insert" ng-include="$ctrl.includeForm"></div>
        <div class="tab-pane" id="update" ng-include="$ctrl.includeForm"></div>
        <div class="tab-pane" id="delete" ng-include="$ctrl.includeForm"></div>
    </div>
    `
});