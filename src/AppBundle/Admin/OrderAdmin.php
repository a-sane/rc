<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;

class OrderAdmin extends AbstractAdmin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Order Details')
                ->add('id', 'text', [
                    'label' => 'Id'
                ])
                ->add('user', 'entity', [
                    'class' => 'Application\Sonata\UserBundle\Entity\User'
                ])
            ->end()
            ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('user')
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('id', null, [
                'route' => [
                    'name' => 'show'
                ]
            ])
            ->add('user')
            ->add('createdAt')
            ->add('updatedAt')
        ;
    }

    // Fields to be shown on show action
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->with('Order Details')
                ->add('id', 'text', [
                    'label' => 'Id'
                ])
                ->add('user', 'entity', [
                    'class' => 'Application\Sonata\UserBundle\Entity\User'
                ])
            ->end()
            ->with('Order Items')
                ->add('orderItems', null, ['template' => 'AppBundle:Admin:show_order_items.html.twig'])
            ->end()
        ;
    }
}