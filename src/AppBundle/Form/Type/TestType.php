<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class TestType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('testChoice', 'choice', [
                'choices' => [
                    1 => 'test 1',
                    2 => 'test 2',
                    3 => 'test 3',
                ],
                'placeholder' => 'test placeholder',
                'choice_attr' => [
                    1 => ['data-test' => 'test 1'],
                    2 => ['data-test' => 'test 2'],
                    3 => ['data-test' => 'test 3'],
                ],
            ]);
    }
} 